import { useMessages } from "./messagesDataProvider.js"
import { useUserMessages } from "./userMessagesDataProvider.js"
import { useUsers } from '../users/userDataProvider.js'

let allUsers = []
let allMessages = []
let allUserMessages = []

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
    ${usersNamesToDisplay.map(theUserName => `${theUserName.username}: `).join("")} ${messagesToDisplay.map(theUserMessage => `<p>${theUserMessage.message}</p>`).join("")}
    <br><br><label for="fname">Enter a message:</label> <input type="text" id="fname" name="fname"> <button>Submit</button>
    `
}