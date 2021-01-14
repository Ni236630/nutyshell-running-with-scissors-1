import { useMessages } from "./messagesDataProvider.js"
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
    
    const convertedToStrings = allUserMessages.map(
        (userMsg) => {
            
            const relatedUser = allUsers.find(user => user.id === userMsg.userId)
            console.log(relatedUser)

            const relatedMessage = allMessages.find(msg => msg.id === userMsg.messageId)
            console.log(relatedMessage)

            return `
                <div class="chatMsg"><b>${relatedUser.username}</b>: ${relatedMessage.message}</div>
            `
        }
    ).join("")

    return `
    <select class="privacy__select" id="privacySelect">
        <option value=0>Public</option>
        <option value=1>Private</option>
    </select>
       
    <div class="chatMessages">
        <div class="chatMsg">${convertedToStrings}</div>
    </div>
    <div class="enterMessages"><br><label for="chatTextInput">Enter a message:</label> <input type="text" id="chatTextInput" name="chatTextInput"> <button>Submit</button></div>
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