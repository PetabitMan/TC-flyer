const express = require("express");
const cors = require("cors");
const fs = require('fs');
const https = require('https');


const app = express();

app.use(cors())
app.use(express.json({ extended: false }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")

})

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   })
// }
const server = https.createServer({
  key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
  cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8')
}, app);


// process.env.port is used for later commit if it doesnt exist it switches to 5000
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Up and Running on port ${PORT}`));
