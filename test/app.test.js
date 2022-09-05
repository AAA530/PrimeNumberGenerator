const {
  FindPrimeUsingLoop,
  FindPrimeUsingSieveOfEratosthenes,
} = require("../controller/primeNumber.controller");
const expect = require("chai").expect;

describe("Testing the prime Number generator", function () {
  it("1. The brute force method", function (done) {
    let res = FindPrimeUsingLoop(2, 10);
    expect(res.ans).deep.to.equal([2, 3, 5, 7]);
    expect(res.strategy).to.equal("BruteForce");
    done();
  });

  it("2. The Sieve Of Eratosthenes method", function (done) {
    let res = FindPrimeUsingSieveOfEratosthenes(2, 10);
    expect(res.ans).deep.to.equal([2, 3, 5, 7]);
    expect(res.strategy).to.equal("Sieve of Eratosthenes");
    done();
  });
});
