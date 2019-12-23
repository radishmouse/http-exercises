
# Template exercise #1

The pages of a dynamic website often display the same elements - the site header, the footer, and a navigation bar. The only thing that changes from page to page is the main content.

To achieve this, you'll put snippets of HTML in "template" files. When your Node.js server receives an incoming Request, it will read the contents of each of these files as strings. It will concatenate these strings together with the main content HTML for that page. 

For example, if the Request's `.url` is `"/blog"`, the server would send back something like this:

```
Contents of header.html

        +

Contents of nav.html

        +

Several <p> of blog content

        +

Contents of footer.html
```

The browser would receve a single, complete HTML document in the Response and render it as it normally would.


## To complete this exercise

You may want to refer to the solution for `hello-http` - it will show techniques such as using `require()`, creating an http server, and listening for a connection.

It is advised that you use `nodemon` to automatically reload your Node.js code (even though you will still need to refresh your browser manually).

## Setup

- Create a new project directory named `template-exercises`

Make sure to initialize it with the following commands:

- `npm init -y`
- `git init`

## Create a `templates` directory in the root of your project

You will save each of your template HTML files to this directory. 

## Create the `header.html` template

Create the skeleton of the HTML page using Emmet.

This will provide you with the a whole HTML document.

Cut the closing `body` and `html` tags so the only remaining markup is the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Template exercise</title>
</head>
<body>
```

## Create the `footer.html` template

Paste the closing `body` and `html` tags into the `footer.html`, and add in a `<footer>` element

```html
    <footer>&copy; 2020 YourSite Inc.</footer>
</body>
</html>
```

(The `&copy;` will show a copyright symbol. It is known as an "HTML Entitiy" and cause the browser to display special characters. You can find a list of them here: https://www.w3schools.com/html/html_entities.asp)

## Create the `nav.html` template

Add a list of links like so:

```html
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/contact">Contact</a></li>
</ul>
```

Note that the `href` values do not refer to specific HTML files. Unlike in previous exercises, your server will generate content to send back in a Response, instead of reading whole HTML files that contain the content.

## Create an `index.js` file

Use the `require()` function to import the `fs` and `http` modules.

## Use `http.createServer()` and `.listen()` for connections

In the callback you pass to `http.createServer()`, simply send back a "Hello" message so that you can test that it works.

```js
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const content = `<h1>Hello!</h1>`;
    res.end(content);

});

server.listen(3000, () => {
    console.log('Server listening at port 3000');
})
```

Run the server and go to `http://localhost:3000` and make sure your "Hello" message appears in the browser.

## Use `fs.readFileSync()` to get the contents of each of your templates

Normally, you read files using `fs.readFile()`.
But, we are reading several files. This would force us to nest our callbacks for every file we read.

Since our files are very small, it is ok for us to use the "synchronous" version of `readFile()`.
This will force Node.js to wait until the file is finished reading and then return the contents when it is done. 

In general, this goes against how Node.js is designed. But it is fine for our example.

Add these `fs.readFileSync()` calls just before you `http.createServer()`:

```js
const header = fs.readFileSync('templates/header.html');
const nav = fs.readFileSync('templates/nav.html');
const footer = fs.readFileSync('templates/footer.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const content = `<h1>Hello!</h1>`;
    res.end(header + nav + content + footer);

});
```

Update the `res.end` so that it concatenates your templates along with your "Hello" message. 

## Make sure it's dynamic

Change the value of your `content` variable so that it shows the current date and time:

```js
    const content = `<h1>Hello!</h1><h2>It is ${new Date()}</h2>`;
```

When you reload the page, you should see the current date and time on the page.

# Template exercise #2

Since your code does not rely on individual HTML files for the content, you are now free to return Responses based solely on what `.url` the client is asking for.

## Writing a `blog()` module

Create a new file named `blog.js`

Create a `getContent()` function that returns a string with `<p>` tags:

```js
function getContent() {
    let result = '';
    let count = 0;
    while (count < 10) {
        result += '<p>What an amazing blog!</p>'
        count += 1;
    }
    return result;
}
```

Make sure to `module.exports=` from your blog module. Since you might export multiple functions, use this syntax:

```js
module.exports = {
    getContent
};
```

## Import the `./blog` module in `index.js`:

```js
const blog = require('./blog');
```


## Check if the value of `req.url` is `"/blog"`

If so, return the result of calling `blog.getContent()`

```js
    let content = `<h1>Hello!</h1><h2>It is ${new Date()}</h2>`;

    if (req.url === '/blog') {
        content = blog.getContent();
    }
```

Reload your browser, go to the `blog` link in the nav, and make sure your blog content is rendered.


## Bonus: Update `getContent` so that you can pass in the number of <p> to generate

Change `getContent()` so that it can be called like so:

```js
getContent(8);
```

Provide a default value so that if it is called without any arguments, it returns a string with 10 `<p>`.

## Bonus: Use the `lorem-ipsum` module to generate content.

To give your blog content better placeholer text, install and use the `lorem-ipsum` module for your `getContent()` function:

https://www.npmjs.com/package/lorem-ipsum

Note: use the `require()` syntax, not the `import` syntax!

# Template exercise #3

Some of your content might be stored in a file. For the last part of the template exercises, you'll read names, emails, and phone numbers from a `.json` file. The information in the `.json` file will be used in a a new `contact` module.

## Create a `contacts.json`

Include at least three entries:

```json
{
    "contacts": [
        {
            "name": "Oakley",
            "phone": "867-5309",
            "email": "oakley@oakley-the-cat.com"
        },
        {
            "name": "Milla",
            "phone": "867-5310",
            "email": "milla@oakley-the-cat.com"
        },
        {
            "name": "Chris",
            "phone": "867-5311",
            "email": "chris@oakley-the-cat.com"
        },
    ]
}
```

## Create a `contacts` module with a `getContacts()` function

At the top of your `contacts` module add this line:

```js
const friends = require('./contacts.json');
```

## Create a `getContacts()` function

In this function, loop through `friends.contacts` and produce a string that looks like this:

```js
            <h1>Oakley</h1>
            <h2>867-5309, oakley@oakley-the-cat.com</h2>
            <h1>Milla</h1>
            <h2>867-5310, milla@oakley-the-cat.com</h2>
            <h1>Chris</h1>
            <h2>867-5311, chris@oakley-the-cat.com</h2>
```

Make sure to export the function:

```js
module.exports = {
    getContacts
};
```

## Import the `./contacts` module into `index.js` and use `contacts.getContacts()`

If the value of `req.url` is `/contact`, set the `content` variable to the result of `contacts.getContacts()`

Save and reload the browser.
Confirm that going to the `contact` link in the nav shows the names, numbers, and email addresses from your `contacts.json`

## Bonus: use the `faker` module

Instead of storing the information in a local file, try using the `faker` module to generate fake contact information.

https://www.npmjs.com/package/faker