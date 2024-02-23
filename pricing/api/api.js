const express = require("express");
var cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/aaa", (req, res) => {
  res.send("aaa");
});
app.post("/", (req, res) => {
  //res.sendStatus(400);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
