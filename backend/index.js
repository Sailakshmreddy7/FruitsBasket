const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
mongoDB();
require("dotenv").config();
app.use((req, res, next) => {
  res.setHeader("Access-Control_Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(cors());
app.use("/api", require("./Routes/CreatUser"));

app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/FruitsRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
