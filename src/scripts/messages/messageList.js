import { useMessages } from "./messagesDataProvider.js"
import { useUserMessages } from "./userMessagesDataProvider.js"
import { useUsers } from '../users/userDataProvider.js'

let allUsers = []
let allMessages = []
let allUserMessages = []

// const eventHub = document.querySelector('.privacy__select')

export const messageList = () => {

    allUsers = useUsers()
    allMessages = useMessages()
    allUserMessages = useUserMessages()
            
    const publicMessages = allUserMessages.filter(message => message.recipientId === 0)
    console.log(publicMessages)

    const messagesToDisplay = publicMessages.map(rel => {
        return allMessages.find(message => message.id === rel.messageId)
    })
    console.log(messagesToDisplay)

    const usersNamesToDisplay = publicMessages.map(rel => {
        return allUsers.find(user => user.id === rel.userId)
    })

    console.log(usersNamesToDisplay)
    return `
    
    <select class="privacy__select" id="privacySelect">
        <option value=0>Public</option>
        <option value=1>Private</option>
    </select>

    <div class="chatMessages">
        ${usersNamesToDisplay.map(theUserName => `${theUserName.username}: `).join("")} ${messagesToDisplay.map(theUserMessage => `<p>${theUserMessage.message}</p>`).join("")}
    </div>
    <div class="enterMessages"><br><label for="fname">Enter a message:</label> <input type="text" id="fname" name="fname"> <button>Submit</button></div>
    
    `
}

// eventHub.addEventListener("change", e => {
//     if (e.target.id === "privacySelect") {
//         let privacyOptionChosen = e.target.value
//         console.log(privacyOptionChosen)
//     }
// })