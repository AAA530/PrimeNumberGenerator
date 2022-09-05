const mongoose = require("mongoose");

const PrimeSchema = new mongoose.Schema(
  {
    ans: [Number],
    strategy: { type: String },
    numberOfPrimes: { type: Number },
    timeTaken: { type: Number },
    range: [Number],
  },
  { timestamps: true }
);

const Prime = mongoose.model("Prime", PrimeSchema);
module.exports = Prime;
