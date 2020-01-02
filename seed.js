const faker = require('faker');
const fs = require('fs');
function generateContactsArray(howMany=5) {
    let result = [];
    while (howMany > 0) {
        let name = faker.name.findName();
        let phone = faker.phone.phoneNumber();
        let email = faker.internet.email();
        const newContact = {
            "name": name,
            "phone": phone,
            "email": email
        };
        result.push(newContact);
        howMany -= 1;
    }
    return result;
}
function generateContactsObject(contactsArray) {
    const contactsObject = {
        "contacts": contactsArray
    }
    return contactsObject;
}

function writeContactsFile(contactsObject) {
    // JSON.stringify converts objects and arrays
    // into a String
    const contactsAsString = JSON.stringify(contactsObject);
    fs.writeFile('contacts.json', contactsAsString, {flags: 'w'}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Seed data written to file!!!!!!!!!!!");
        }
    });
}

function main() {
    const contactsArray = generateContactsArray();
    const contactsObject = generateContactsObject(contactsArray);
    writeContactsFile(contactsObject);
}

main();

module.exports = {
    generateContactsArray
};