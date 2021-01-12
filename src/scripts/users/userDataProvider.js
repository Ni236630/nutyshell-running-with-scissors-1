// Ryan DeVault - Fetches users information from the database.json file within the api folder

// Local Variables
let users = [];

// Selectors
const eventHub = document.querySelector('.container');

// Returns a copy of the users array
export const useUsers = () => users.slice();

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(parsedUsers => users = parsedUsers);
};

const dispatchStateChangeEvent = () => {
    const userStateChangeEvent = new CustomEvent("userStateChanged");

    eventHub.dispatchEvent(userStateChangeEvent);
};
    
// WAIT IS THIS NECESARY? Auth folder seems to already handle saving new users
// Saves new users to the API
export const saveUser = user => {
    return fetch('http://localhost:8088/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(getUsers)
    .then(dispatchStateChangeEvent);
};