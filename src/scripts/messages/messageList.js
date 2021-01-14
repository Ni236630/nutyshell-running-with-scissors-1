// Component Author: Ryan Youngblood
// Purpose: List user messages to the messages (chat) section on the DOM

import { deleteMessage, getMessages, saveMessage, useMessages } from "./messagesDataProvider.js"
import { saveUserMessage, useUserMessages } from "./userMessagesDataProvider.js"
import { useUsers } from '../users/userDataProvider.js'

// Setup the arrays to plug data in
let allUsers = []
let allMessages = []
let allUserMessages = []

// Setup the active user variable
let activeUser = ""

const eventHub = document.querySelector('.container')

// Sort the users and message then get them on the DOM. Currently this is a public message feature and does not take into account if a message is private or not.
export const messageList = () => {

    // Get current data
    allUsers = useUsers()
    allMessages = useMessages()
    allUserMessages = useUserMessages()
    activeUser = parseInt(sessionStorage.getItem('activeUser'));
    
    // Convert the neccessary data to strings
    const convertedToStrings = allUserMessages.map(
        (userMsg) => {
            
            // Find the user from the join table
            const relatedUser = allUsers.find(user => user.id === userMsg.userId)

            // Find the message from the join table
            const relatedMessage = allMessages.find(msg => msg.id === userMsg.messageId)

            if (relatedUser.id === activeUser) {
                return `
                <div class="chatMsg" id="chat--${relatedMessage.id}"><b>${relatedUser.username}</b>: ${relatedMessage.message} <button id="chat--Delete--${relatedMessage.id}">Delete</button></div>
                `
            } else {
                // Return each chat message with the username
                return `
                <div class="chatMsg" id="chat--${relatedMessage.id}"><b>${relatedUser.username}</b>: ${relatedMessage.message}</div>
                `
            }

        }
    ).join("")
    
    // Return the full chat message DOM element with all needed data plugged in
    return `
    <h1>MESSAGE LIST</h1>
    <select class="privacy__select" id="privacySelect">
        <option value=0>Public</option>
        <option value=1>Private</option>
    </select>
    <div class="chatMessages" id="chatMessages">
        <div class="chatMsg">${convertedToStrings}</div>
    </div>
    <div class="enterMessages"><br><label for="chatTextInput">Enter a message:</label> <input type="text" id="chatTextInput" name="chatTextInput"> <button id="chat--Entry">Submit</button></div>
    `
}

//-----------------------------------------------//
//               Event Listeners                 //
//-----------------------------------------------//

eventHub.addEventListener("click", clickEvent => {
    
    // If the click event took place on a chat-- button then..
    if(clickEvent.target.id.startsWith("chat--")){
        
        let matchingButton = clickEvent.target.id.split("--")
        let buttonName = matchingButton[1]
        let chatEntryId = matchingButton[2]

        console.log(buttonName)

        // If that button is the Entry button then..
        if (buttonName === "Entry") {
            // Grab the user text
            const userText = document.querySelector("#chatTextInput")
            // Get the active user ID
            activeUser = parseInt(sessionStorage.getItem('activeUser'));

            // Create a new object to pass to the messages table in the json DB
            const newMessage = {
                message: userText.value,
                timestamp: Date.now()
            }

            // Clear out the input box
            userText.value = ""
            
            // Send the new message to the json DB
            saveMessage(newMessage)
                // Update messages so the new ID can be accessed
                .then(getMessages)
                .then(() => {
                    // Grab the last entry from the array
                    const messages = useMessages().pop()
                    
                    // Create a new object to pass the new join table to the json DB
                    const newUserMessage = {
                        userId: activeUser,
                        messageId: messages.id,
                        recipientId: 0
                    }

                    // Send the new object to the userMessages table in the json DB
                    saveUserMessage(newUserMessage)
                })

        // If that button is the Delete button then...
        } else if (buttonName === "Delete") {
            console.log(chatEntryId)
            deleteMessage(chatEntryId)
        }
    }


})

// Event listener for public/private filtering. Needs work!
eventHub.addEventListener("change", e => {

    if (e.target.id === "privacySelect") {
        let privacyOptionChosen = e.target.value

        if (privacyOptionChosen = 1){
            console.log(`Private was chosen`)
            chatText.innerHTML = "Private"
        } else {
            console.log(`Public was chosen`)
            chatText.innerHTML = 'Public'
        }
    }
})