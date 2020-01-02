const http = require('http');
const fs = require('fs');
const blog = require('./blog');
const contacts = require('./contacts');

const header = fs.readFileSync('templates/header.html');
const nav = fs.readFileSync('templates/nav.html');
const footer = fs.readFileSync('templates/footer.html');

// console.log(footer.toString());

console.log('about to create server!');
const server = http.createServer((req, res) => {
    console.log('***** oh wow a request *****');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    let content = `<h1>Hello!</h1><h2>It is ${new Date()}</h2>`;

    if (req.url === '/blog') {
        content = blog.getContent(8);
    } else if (req.url === '/contact') {
        content = contacts.getContacts();
    }

    // res.write(header);
    // res.write(nav);
    // res.write(content);
    // res.write(footer);
    // res.end();
    res.end(header + nav + content + footer);

});
console.log('yep. i totally created that server!');

server.listen(3000, () => {
    console.log('Server is listening at port 3000');
});