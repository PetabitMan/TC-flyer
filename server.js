const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('certificate/server.key', 'utf8');
const certificate = fs.readFileSync('certificate/server.cert', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const express = require('express');
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080, '192.168.0.229');
// httpsServer.listen(8443, '192.168.0.229');


httpServer.listen(8080, '172.16.1.21');
httpsServer.listen(8443, '172.16.1.21');