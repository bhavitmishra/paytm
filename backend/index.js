const express = require("express");
const app = express();
const router = require("./routes/index.js");

app.use(express.json());

app.use("/api/v1", router);

app.listen(3000);
