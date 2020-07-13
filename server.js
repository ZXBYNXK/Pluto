const express = require("express");
const server = express();
const PORT = process.env.PORT || 5000;
server.get("/", (req, res) => res.status(200).json({ test: true }));
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
