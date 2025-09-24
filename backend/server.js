//const express = require("express");
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); //helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); //log the requests to the console

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
