const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const pixelPath = path.join(__dirname, "1x1.png");

app.get("/track/:id", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const time = new Date().toISOString();
  const id = req.params.id;

  const logEntry = `${time} | ID: ${id} | IP: ${ip} | UA: ${userAgent}\n`;
  fs.appendFileSync("logs.txt", logEntry);

  res.set("Content-Type", "image/png");
  res.sendFile(pixelPath);
});

app.listen(PORT, () => {
  console.log(`Pixel tracker en ligne sur le port ${PORT}`);
});
