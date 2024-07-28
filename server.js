// Create a git repository for this project
// Connect the code on your local computer to the githut repository
// Make sure the server is running
// Complete code block

// ESModules Style
// import http from 'http';
// CommonJS Style
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const HOSTNAME = 'localhost';

// HTTP: Create the Server
const server = http.createServer(serverHandler);

function serverHandler(req, res) {
    // HTTP: req and res
    if (req.method === 'GET' && req.url === '/') {
        // PATH: Get the file
        const filePath = path.resolve(__dirname, 'public/index.html');
        // File System: Check if file exists
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            // HTTP: res
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`
                <html>
                    <body>
                        <h3>Page not found</h3>
                    </body>
                </html>
            `);
        } else {
            // HTTP: res
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            // File System: Create stream of file
            fs.createReadStream(filePath).pipe(res);
        }
    }

    if (req.method === 'GET' && req.url === '/notes'){
        let notes = [
            {
                id: 1,
                title:"Note Title"
            },
            {
                id: 2,
                title: "Title 2"
            }
        ];

res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify(notes));

    }

    // If the request method is "GET" AND the request url is '/notes'
    // b. If request method is GET and URL is '/notes', handle as follows:
    //     i. Define an array of notes
    //     ii. Set response status to 200
    //     iii. Set response header for content type as 'application/json'
    //     iv. End response with JSON string of notes array
}

// HTTP: Start Server
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at ${HOSTNAME}:${PORT}`)
});





