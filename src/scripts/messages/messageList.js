// Component Author: Ryan Youngblood
// Purpose: List user messages to the messages (chat) section on the DOM

import { deleteMessage, getMessages, saveMessage, useMessages, updateMessage } from "./messagesDataProvider.js"
import { deleteUserMessage, saveUserMessage, useUserMessages } from "./userMessagesDataProvider.js"
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
    // Get active users ID
    activeUser = parseInt(sessionStorage.getItem('activeUser'));
    
    // Convert the neccessary data to strings
    const convertedToStrings = allUserMessages.map(
        (userMsg) => {
            
            // Get the recipient ID
            const recipient = userMsg.recipient_Id

            // Find the user who sent the message from the join table
            const sender = allUsers.find(user => user.id === userMsg.userId)

            // Find the message from the join table
            const relatedMessage = allMessages.find(msg => msg.id === userMsg.messageId)

            // Current user to gain access to their username
            let currentUser = allUsers.find(u => u.id === activeUser)

            // Get recipient to gain access to their username
            let recipientName = allUsers.find(u => u.id === recipient)

            // if the related user is the current active user then...
            if (sender.id === activeUser) {
                
                // if this is a private message then...
                if (recipient > 0) {
                    
                    return `
                        <div class="chatMsg--private" id="chat--${relatedMessage.id}"><b>${sender.username}</b>: <b class="userTag">@${recipientName.username}</b> ${relatedMessage.message} <button id="chat--Edit--${relatedMessage.id}--${userMsg.id}">Edit</button> <button id="chat--Delete--${relatedMessage.id}--${userMsg.id}">Delete</button></div>
                    `  
                // This is from the active user, but is a public message
                } else {
                    
                    return `
                    <div class="chatMsg--public" id="chat--${relatedMessage.id}"><b>${sender.username}</b>: ${relatedMessage.message} <button id="chat--Edit--${relatedMessage.id}--${userMsg.id}">Edit</button> <button id="chat--Delete--${relatedMessage.id}--${userMsg.id}">Delete</button></div>
                    ` 
                }

            } else {
                
                if (recipient > 0) {

                    if (recipient === activeUser) {
                        
                        return `
                        <div class="chatMsg--private" id="chat--${relatedMessage.id}"><b>${sender.username}</b>: <b class="userTag">@${currentUser.username}</b> ${relatedMessage.message}</div>
                        ` 
                    }

                } else {
                    // Return all public chat messages with the usernames
                    return `
                    <div class="chatMsg--public" id="chat--${relatedMessage.id}"><b>${sender.username}</b>: ${relatedMessage.message}</div>
                    `
                }
            }
       }
    ).join("")
    
    // Return the full chat message DOM element with all needed data plugged in
    return `
    <div class="chatMessages" id="chatMessages">
        <div class="chatMsg">${convertedToStrings}</div>
    </div>
    <div class="enterMessages"><br><label for="chatTextInput">Enter a message:</label> <input type="text" id="chatTextInput" name="chatTextInput"> <button id="chat--Entry">Submit</button></div>
    `
}

eventHub.addEventListener("click", clickEvent => {
    
    // If the click event took place on a chat-- button then..
    if(clickEvent.target.id.startsWith("chat--")){
        
        // Split the button name to get either Entry or Delete and access to ID's
        let matchingButton = clickEvent.target.id.split("--")
        
        // Entry or Delete
        let buttonName = matchingButton[1]
        console.log(buttonName)

        // ID of the message to be used if a user wants to delete
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

                // Split the input to grab the username
                const friendTag = userText.value.split(" ")

                // Remove the @ so the name can be used to search
                const friendName = friendTag[0].substring(1)
            
                // Find the user by friendName
                const recipient = allUsers.find(f => f.username === friendName)
                
                // Remove the @username and only save the actual message
                const message = userText.value.substr(userText.value.indexOf(" ") + 1)

                // Create a new object to pass to the messages table in the json DB
                const newMessage = {
                    message: message,
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
                                recipient_Id: recipient.id
                            }
    
                            // Send the new object to the userMessages table in the json DB
                            saveUserMessage(newUserMessage)
                        })
            
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
                            recipient_Id: 0
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
        
        // If that button is the edit button then...
        } else if (buttonName === "Edit"){ 

            // Grab all message so we can extract the proper one
            allMessages = useMessages()

            // Find the message with an id that matches the messageId
            const messageToEdit = allMessages.find(m => m.id === parseInt(messageId))

            // Set the selector on the DOM
            const editLocation = document.getElementById(`chat--${userMessageId}`)
            
            // Add an input box and submit button in place of the chat message being edited by using the selector above
            editLocation.innerHTML = `<input class="chatEdit" type="text" id="chatTextEditInput" name="chatTextEditInput"> <button id="chat--Submit--${messageId}">Submit</button>`

            // Set a selector for the new input box that was generated
            const editText = document.getElementById('chatTextEditInput')

            // Fill the new input box with the text of the message
            editText.value = messageToEdit.message
        
        // When done editing and the user clicks submit...
        } else if (buttonName === "Submit"){

            // Set the selector for the input box with edited text
            const editText = document.getElementById('chatTextEditInput')
            
            const entryObject = {
                id: parseInt(messageId),  // Make sure the ID is the same as the original message.
                message: editText.value,  // Grab the text from the selector and put it in the updated message object
                timestamp: Date.now()     // Update the timestamp
            }

            // Send the new object to the data provider and update the entry
            updateMessage(entryObject)
        }
    }
})