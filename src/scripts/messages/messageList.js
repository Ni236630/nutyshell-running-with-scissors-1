// Component Author: Ryan Youngblood
// Purpose: List user messages to the messages (chat) section on the DOM

import { deleteMessage, getMessages, saveMessage, useMessages } from "./messagesDataProvider.js"
import { deleteUserMessage, saveUserMessage, useUserMessages } from "./userMessagesDataProvider.js"
import { useUsers } from '../users/userDataProvider.js'
import { useFriends } from "../friends/friendDataProvider.js"

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
                <div class="chatMsg" id="chat--${relatedMessage.id}"><b>${relatedUser.username}</b>: ${relatedMessage.message} <button id="chat--Delete--${relatedMessage.id}--${userMsg.id}">Delete</button></div>
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

// eventHub.addEventListener('keyup', e => {
//     if (e.target.id === 'chatTextInput' && e.target.value.startsWith("@")) {
//         console.log('its going!')
//         const chatBar = document.querySelector('#chatTextInput')
//         const users = useUsers()
//         const friends = useFriends()
//         const activeUser = parseInt(sessionStorage.getItem('activeUser'))

//         let friendResults = []
//         let chatInput = chatBar.value.toLowerCase()


//     }
// })

eventHub.addEventListener("click", clickEvent => {
    
    // If the click event took place on a chat-- button then..
    if(clickEvent.target.id.startsWith("chat--")){
        
        let matchingButton = clickEvent.target.id.split("--")
        let buttonName = matchingButton[1]
        let messageId = matchingButton[2]
        let userMessageId = matchingButton[3]

        // If that button is the Entry button then..
        if (buttonName === "Entry") {
            // Grab the user text
            const userText = document.querySelector("#chatTextInput")

            // Get the active user ID
            activeUser = parseInt(sessionStorage.getItem('activeUser'));

            // If the message is meant to be private then...
            if (userText.value.startsWith("@")) {
                
                // Get friends
                const friends = useFriends()

                // Split the input to grab the username
                const friendTag = userText.value.split(" ")

                // Remove the @ so the name can be used to search
                const friendName = friendTag[0].substring(1)
                console.log(`My friend is: `, friendName)

                // Need to get back all friends table entries with all .userId === activeUser (activeUser already stores current user ID) -----map friends?
            
            // If there was no '@' then the message is public so do this...
            } else {
               
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
                }

        // If that button is the Delete button then...
        } else if (buttonName === "Delete") {
            
            deleteUserMessage(userMessageId)
            .then(() => {
                deleteMessage(messageId)
            })
            
        }
    }
})

// Event listener for public/private filtering. Needs work!
// eventHub.addEventListener("change", e => {

//     if (e.target.id === "privacySelect") {
//         let privacyOptionChosen = e.target.value

//         if (privacyOptionChosen = 1){
//             console.log(`Private was chosen`)
//             chatText.innerHTML = "Private"
//         } else {
//             console.log(`Public was chosen`)
//             chatText.innerHTML = 'Public'
//         }
//     }
// })