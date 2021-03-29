const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

})

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   })
// }


// process.env.port is used for later commit if it doesnt exist it switches to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Up and Running on port ${PORT}`));
