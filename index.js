const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Node app is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
