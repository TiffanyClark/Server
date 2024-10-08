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

//Helper Functions
function readNotes(callback){
    const filePath = path.resolve(__dirname, 'notes.json');
    fs.readFile(filePath, "utf-8",(err,data)=>{
        if(err){
            callback(err, null);
        }else{
            callback(null, JSON.parse(data));
        }
    });
}

//CRUD function

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
    } else if (req.method === 'GET' && req.url === '/notes'){
        readNotes((err, notes) => {
            if(err){
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/html");
                res.end(`
                    <html>
                        <body>
                            <h3>Internal Server Error</h3>
                        </body>
                    </html>
                `);
            }else{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(notes));
            }
        })
    }

};

// HTTP: Start Server
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at ${HOSTNAME}:${PORT}`)
});





