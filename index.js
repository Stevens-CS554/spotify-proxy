const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const cors = require("cors");
const accountInstance = axios.create({
  baseURL: "https://accounts.spotify.com/api/",
  timeout: 1000
});
const apiInstance = axios.create({
  baseURL: "https://api.spotify.com/",
  timeout: 1000
});

app.use(cors());

app.use("/api/token", async (req, res) => {
  try {
    const token = await accountInstance({
      method: req.method,
      url: "token",
      data: "grant_type=client_credentials",
      withCredentials: true,
      headers: {
        Authorization: req.headers.authorization
      }
    });

    res.status(token.status);
    res.json(token.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ failed: true });
  }
});

app.use("*", async (req, res) => {
  try {
    const apiResult = await apiInstance({
      method: req.method,
      url: req.originalUrl,
      data: req.body,
      withCredentials: true,
      headers: {
        Authorization: req.headers.authorization
      }
    });

    res.status(apiResult.status);
    res.json(apiResult.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ failed: true });
  }
});

app.get("*", function(req, res, next) {
  res.json({ working: true });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
