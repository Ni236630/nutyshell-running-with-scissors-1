// Ryan DeVault - Purpose: Retrieve users information from the database.json file within the api folder

// Local Variables
let users = [];

// GETs users from database.json and stores them in the local users variable
export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(parsedUsers => users = parsedUsers);
};

// Returns a copy of the array in the users variable
export const useUsers = () => users.slice();