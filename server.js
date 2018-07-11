const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

const API = "https://api.freebinchecker.com/bin";

app.get("/bin", (req, res) => {
  axios
    .get(`${API}/437551`)
    .then(response => {
      res.status(200).send({ data: response.data });
    })
    .catch(error => {
      res.status(500).send();
    });
});

app.get("/bin/:firstSixDigit", (req, res) => {
  if (req.params.firstSixDigit) {
    axios
      .get(`${API}/${req.params.firstSixDigit}`)
      .then(response => {
        res.status(200).send({ data: response.data });
      })
      .catch(error => {
        res.status(500).send();
      });
  } else {
    res.status(400).send();
  }
});

app.get("*", (req, res) => {
  res.send({ name: "Saurav" });
});

app.listen(port, () => {
  console.log("Server started");
});
