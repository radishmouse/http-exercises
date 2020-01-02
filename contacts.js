const friends = require('./contacts.json');
// console.log(friends.contacts[1]);
const faker = require('faker');

function getFakeContacts(howMany=5) {
    let result = '';
    while (howMany > 0) {
        let name = faker.name.findName();
        let phone = faker.phone.phoneNumber();
        let email = faker.internet.email();
        let contact = `
            <h1>${name}</h1>
            <h2>${phone}, ${email}</h2>    
        `;
    
        // first console.log
        result += contact;
        howMany -= 1;
    }

    return result;
}

function getContacts() {

    let result = '';
    for (let friend of friends.contacts) {
        // let name = friend.name;
        // let phone = friend.phone;
        // let email = friend.email;

        // destructuring
        // create multiple variables
        // and pluck out the corresponding values
        const {name, phone, email} = friend;
        // your variable names in the curly braces
        // MUST match!

    
        let contact = `
            <h1>${name}</h1>
            <h2>${phone}, ${email}</h2>    
        `;
    
        // first console.log
        result += contact;
    }
    // then return
    // console.log(result);
    return result;
}

// getContacts();
module.exports = {
    getContacts,
    getFakeContacts
};