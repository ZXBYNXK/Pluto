const express = require("express");
const server = express();
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000;
server.get("/", (req, res) => res.status(200).json({ test: true }));
connectDB();
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
