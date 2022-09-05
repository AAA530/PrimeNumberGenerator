const {
  GetPrimeNumbersBetweenTwoNumbers,
  GetHistory,
} = require("../controller/primeNumber.controller");

const Router = require("express").Router();

Router.post("/", GetPrimeNumbersBetweenTwoNumbers); // Generate prime numbers
Router.get("/", GetHistory); // Get History of previously generated prime number

module.exports = Router;
