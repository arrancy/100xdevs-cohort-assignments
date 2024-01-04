/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.listen(4000);
const dirPath = "C:/coding/assignments-master/week-2/02-nodejs/files"
app.get("/", (req, res)=>{res.send("hello world")});
app.get("/files", (req, res)=>{
 
  fs.readdir(dirPath, (err, files)=>{if(err){
    throw err;
  }
else{
  res.status(200).json({ "files": files})
}})})


app.get("/file/:filename", (req, res)=>{
  const fileName = req.params.filename
  const filePath = path.join(dirPath, fileName)
  res.sendFile(filePath, (err)=>{if (err) {
    res.status(404).send('File not found');
  } else {
    console.log("the file has been sent")
  }})
})

app.get("*", (req, res)=>{res.status(404).send("Route not found")})


module.exports = app;