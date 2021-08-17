const fs = require('fs');
const express = require('express');

const app = express();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})


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
  const credentials = { key: privateKey, cert: certificate };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);
  //short cuts wlan
  // httpServer.listen(8080, '192.168.0.229');
  // httpsServer.listen(8443, '192.168.0.229');

  //my phone hotspot
  // httpServer.listen(8080, '172.20.10.2');
  // httpsServer.listen(8443, '172.20.10.2');

  //home hostel
  httpServer.listen(8080, '192.168.9.37');
  httpsServer.listen(8443, '192.168.9.37');


}

