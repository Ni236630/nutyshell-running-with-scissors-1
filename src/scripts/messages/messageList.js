import { getMessages, useMessages } from "./messagesDataProvider.js"
import { useUserMessages } from "./userMessagesDataProvider.js"
import { useUsers } from '../users/userDataProvider.js'

let allUsers = []
let allMessages = []
let allUserMessages = []

const eventHub = document.querySelector('.container')

export const messageList = () => {

    allUsers = useUsers()
    allMessages = useMessages()
    allUserMessages = useUserMessages()
    
    const publicMessages = allUserMessages.filter(message => message.recipientId === 0)
    // console.log(`Public Messages:`, publicMessages)

    const messagesToDisplay = publicMessages.map(rel => {
        return allMessages.find(message => message.id === rel.messageId)
    })
    // console.log(`Message Content`, messagesToDisplay)

    const assignedUser = publicMessages.map(rel => {
        return allUsers.find(user => user.id === rel.userId)
    })
    // console.log(`Users who sent messages:`, assignedUser)
    
    return `
        <select class="privacy__select" id="privacySelect">
            <option value=0>Public</option>
            <option value=1>Private</option>
        </select>

        <div class="chatMessages">
            ${assignedUser.map(theUserName => `<p><b>${theUserName.username}</b>: `).join("")} ${messagesToDisplay.map(theUserMessage => `${theUserMessage.message} </p>`).join("")}
        </div>
        <div class="enterMessages"><br><label for="fname">Enter a message:</label> <input type="text" id="fname" name="fname"> <button>Submit</button></div>
    `
    
}

eventHub.addEventListener("change", e => {
    
    const chatText = document.querySelector('.chatMessages')

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