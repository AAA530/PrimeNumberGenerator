const { performance } = require("perf_hooks");
const Prime = require("./../models/primeNumber.model");

// Generating Prime Numbers
const GetPrimeNumbersBetweenTwoNumbers = async (req, res) => {
  try {
    // Inputs required n1,n1 and mode
    // we will be finding prime numbers between n1 and n2
    // mode = 0 ; Brute force method will be used
    // mode = 1 ; Sieve of Eratosthenes method will be used
    // If mode is not specified brute force method will be used
    let { mode, n1, n2 } = req.body;

    if (!mode) {
      mode = 0; // By default mode 0
    }
    // Input Validation
    if (
      !(Number.isInteger(n1) && Number.isInteger(n2) && Number.isInteger(mode))
    ) {
      return res
        .status(400)
        .json({ msg: "n1, n2 and mode should be integers" });
    } else if (n1 < 0 || n2 < 0) {
      return res.status(400).json({ msg: "n1 and n2 should be positive" });
    } else if (n1 > n2) {
      return res.status(400).json({ msg: "n2 should be greater than n1" });
    }

    let ans;
    if (mode == 0) {
      ans = FindPrimeUsingLoop(n1, n2);
    } else {
      ans = FindPrimeUsingSieveOfEratosthenes(n1, n2);
    }

    // Saving the generated numbers in mongodb
    const prime = new Prime({ ...ans, range: [n1, n2] });
    await prime.save();

    return res.status(200).json(ans);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Fetching data from db
const GetHistory = async (req, res) => {
  try {
    const ans = await Prime.find({}).sort({ createdAt: -1 }); //get recent data first
    return res.status(200).json(ans);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Finding prime using Brute force method
const FindPrimeUsingLoop = (n1, n2) => {
  let startTime = performance.now();
  let ans = [];
  const strategy = "BruteForce";
  for (let i = n1; i <= n2; i++) {
    console.log(i);
    if (i == 0 || i == 1) {
      continue;
    } else {
      let counter = true;

      for (let j = 2; j * j <= i; j++) {
        if (i % j == 0) {
          counter = false;
          break;
        }
      }

      if (counter) {
        ans.push(i);
      }
    }
  }

  let endTime = performance.now();
  let timeTaken = endTime - startTime;
  return { ans, timeTaken, strategy, numberOfPrimes: ans.length };
};

// Finding prime using Sieve of Eratosthenes
const FindPrimeUsingSieveOfEratosthenes = (n1, n2) => {
  let startTime = performance.now();
  let elements = n2 + 1;
  const strategy = "Sieve of Eratosthenes";

  let arr = new Array(elements).fill(true);
  arr[0] = false;
  arr[1] = false;
  let ans = [];

  for (let i = 2; i * i <= n2; i++) {
    console.log(i);

    if (arr[i] == true) {
      for (let j = 2; i * j <= n2; j++) {
        arr[i * j] = false;
      }
    }
  }

  for (let i = n1; i <= n2; i++) {
    if (arr[i]) {
      ans.push(i);
    }
  }

  let endTime = performance.now();
  let timeTaken = endTime - startTime;
  return { ans, timeTaken, strategy, numberOfPrimes: ans.length };
};

module.exports = {
  GetPrimeNumbersBetweenTwoNumbers,
  FindPrimeUsingLoop,
  FindPrimeUsingSieveOfEratosthenes,
  GetHistory,
};
