const express = require("express");
var cors = require("cors");
const app = express();
const { faker } = require("@faker-js/faker");
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [];
for (let i = 0; i < 20; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}
app.get("/", (req, res) => {
  const filteredProducts = !req.query.q
    ? products
    : products.filter((p) =>
        p.name.toLowerCase().includes(req.query.q.toLowerCase()),
      );
  res.json(filteredProducts);
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
