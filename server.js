const express = require("express");
const axios = require("axios");
const requester = require("request");
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

// app.use("/", require("./irctc"));

const API = "https://api.freebinchecker.com/bin";
const IRCTCAPI = "https://www.irctc.co.in/eticketing/protected/mapps1";

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

app.get("/port", (req, res) => {
  res.send({ port: port });
});

app.get("/saurav*", function(req, res) {
  const url = IRCTCAPI + req.url.replace("/saurav", "");
  console.log("url: ", url);
  const headers = {
    "Content-Type": "application/json",
    greq: new Date().getTime()
  };
  axios
    .get(url, {
      headers: headers
    })
    .then(response => {
      console.log("response");
      console.log(response);
      res.status(200).send({ data: response.data });
    })
    .catch(error => {
      console.log("error");
      console.log(error);
      res.status(500).send();
    });
});

app.get("/gaurav*", function(req, res) {
  const url = IRCTCAPI + req.url.replace("/gaurav", "");
  console.log("url: ", url);
  const headers = {
    "Content-Type": "application/json",
    greq: new Date().getTime()
  };
  requester(
    {
      url: url,
      headers: headers,
      method: "get"
    },
    function(error, result, body) {
      res.setHeader("Content-Type", "application/json");
      if (error) {
        console.log("error");
        console.log(error);
        if (error.statusCode) {
          res.statusCode = error.statusCode;
        } else {
          res.statusCode = 500;
        }
        res.send(error);
      } else {
        console.log("result");
        console.log(result);
        if (result && result.statusCode) {
          res.statusCode = result.statusCode;
        }
        res.send(body);
      }
    }
  );
});

app.post("/saurav*", function(req, res) {
  const url = IRCTCAPI + req.url.replace("/saurav", "");
  const data = req.body;
  console.log("url: ", url);
  console.log("data: ", data);
  const headers = {
    "Content-Type": "application/json",
    greq: new Date().getTime()
  };
  axios
    .post(url, data, { headers: headers })
    .then(response => {
      console.log("response");
      console.log(response);
      res.status(200).send({ data: response.data });
    })
    .catch(error => {
      console.log("error");
      console.log(error);
      res.status(500).send();
    });
});

const headers = {
  "Content-Type": "application/json",
  greq: new Date().getTime()
};

const sourceStationCode = "ANVT";
const destinationStationCode = "BTH";
const journeyDate = "20180810";

axios
  .get(
    `${IRCTCAPI}/tbstns/${sourceStationCode}/${destinationStationCode}/${journeyDate}`,
    {
      headers: headers
    }
  )
  .then(response => {
    console.log(JSON.stringify(response.data, undefined, 2));
  })
  .catch(error => {
    console.log("error" + error);
  });

app.get("*", (req, res) => {
  res.send({ name: "Saurav, Gaurav" });
});

app.listen(port, () => {
  console.log("Server started on " + port);
});
