const fs = require('fs');
const express = require('express');

const app = express();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

// httpServer.listen(8080, '192.168.0.229');
// httpsServer.listen(8443, '192.168.0.229');
if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Up and Running on port ${PORT}`));
} else {
  const http = require('http');
  const https = require('https');
  const privateKey = fs.readFileSync('certificate/server.key', 'utf8');
  const certificate = fs.readFileSync('certificate/server.cert', 'utf8');
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);
  const credentials = { key: privateKey, cert: certificate };
  httpServer.listen(8080, '192.168.0.129');
  httpsServer.listen(8443, '192.168.0.129');

}

