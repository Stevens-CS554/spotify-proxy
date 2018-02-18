const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res, next) {
  res.json({ working: true });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
