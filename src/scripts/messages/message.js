export const messageHTML = (user, message) => {
    return `
    <b>${user.username}</b>: ${message.message}
    `
}