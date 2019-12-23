const friends = require('./contacts.json');

function getContacts() {

    let result = '';
    for (let friend of friends.contacts) {
        result += `
            <h1>${friend.name}</h1>
            <h2>${friend.phone}, ${friend.email}</h2>
        `;
    }
    return result;
}

module.exports = {
    getContacts
};