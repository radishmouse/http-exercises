const http = require('http');
const fs = require('fs');

const header = fs.readFileSync('templates/header.html');
const nav = fs.readFileSync('templates/nav.html');
const footer = fs.readFileSync('templates/footer.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const content = `<h1>Hello!</h1><h2>It is ${new Date()}</h2>`;
    res.end(header + nav + content + footer);

});

server.listen(3000, () => {
    console.log('Server is listening at port 3000');
});