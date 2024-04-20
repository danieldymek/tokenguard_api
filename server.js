const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const url = "https://api.tokenguard.io/db-api/growth-index/basic-timeline-data";

const getBody = (chainName, compareName) => {
  if (!compareName)
    return {
      chainName,
      period: "last year",
      metric: "tg_growth_index",
      compareWith: [],
    };
  return {
    chainName,
    period: "last year",
    metric: "tg_growth_index",
    compareWith: [compareName],
  };
};

app.post("/basic-timeline-data", (req, res) => {
  const { body } = req;

  const { chainName, compareName } = body;

  axios
    .post(url, getBody(chainName, compareName))
    .then(({ data }) => {
      console.log("success");
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while fetching the data.");
    });
});

app.listen(5001, () => console.log("server running"));
