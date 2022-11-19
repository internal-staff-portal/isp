const { Logger } = require("@laurenz1606/logger");
const express = require("express");
const path = require("path");

//create express app
const app = express();

//create new logger
const logger = new Logger({ format: "[%L] %t %m" });

//get the api url for the backend (NEEDS TO BE AT THE TOP)
app.get("/api_url", (req, res) => {
  res.json({ url: process.env.BACKEND_URL });
});

//host static files
app.use(express.static(path.join(__dirname, "build")));

//host index files
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//start backend
app.listen(process.env.PORT);

//log app start
logger.log("info", `Started frontend express server on ${process.env.PORT}!`);
