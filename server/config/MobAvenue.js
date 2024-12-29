const axios = require("axios");
const mongoose = require("mongoose");
const Data = require("../modals/mobAvenueModal");
const FormData = require("form-data");
const { DateTime } = require("luxon");

const mongoURI =
  "mongodb+srv://suryanshsinghal:kali@cluster0.s4wicgt.mongodb.net/bob-krafton-dashboard";

async function db() {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
}

async function signIn() {
  const url = "https://surgex.affise.com/signin";

  const form = new FormData();
  form.append("email", "tabrez@bobble.ai");
  form.append("password", "Bobble_1212");
  form.append("remember", "0");

  const headers = {
    ...form.getHeaders(),
    accept: "application/json, text/plain, */*",
    origin: "https://surgex.affise.com",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
  };

  try {
    const response = await axios.post(url, form, { headers });
    return response.data;
  } catch (error) {
    // console.error("Error during sign-in:", error.response.data);
    return null;
  }
}

async function getCustomStats(apiKey, accessHeader) {
  const url2 = "https://api-surgex.affise.com/3.0/stats/custom";

  const yesterday = DateTime.local().minus({ days: 1 }).toISODate();

  const params = {
    "filter[date_from]": yesterday,
    "filter[date_to]": yesterday,
    timezone: "Asia/Kolkata",
    "slice[]": ["day", "month", "year"],
  };

  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "api-key": apiKey,
    authorization: `Bearer ${accessHeader}`,
    "cache-control": "no-cache",
    origin: "https://surgex.affise.com",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
  };

  try {
    const response = await axios.get(url2, {
      headers,
      params,
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error(
      "Error fetching custom stats:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

async function main() {
  let signinResult;
  while (true) {
    signinResult = await signIn();
    if (signinResult && signinResult.status === 1) {
      break;
    } else {
      console.log(signinResult);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  if (signinResult && signinResult.status !== 1) {
    console.log(signinResult);
  } else {
    const accessHeader = signinResult.access_header;
    const apiKey = signinResult.api_key;
    const result = await getCustomStats(apiKey, accessHeader);
    const dataToUpload = [];

    if (result.status === 1) {
      const dataToWrite = result.stats;
      dataToWrite.forEach((data) => {
        const day = String(data.slice.day).padStart(2, "0");
        const month = String(data.slice.month).padStart(2, "0");
        const year = data.slice.year;
        const date = `${day}-${month}-${year}`;
        const impressions = data.views;
        const clicks = parseInt(data.traffic.raw, 10);
        const installs = data.actions.confirmed.count;
        const revenueUsd = parseFloat(data.actions.confirmed.revenue).toFixed(
          2
        );
        const revenueInr = revenueUsd * 83;
        const cpi = revenueInr / installs;
        const ctr = clicks / impressions;
        const cr = installs / clicks;
        const eCpm = (revenueInr / impressions) * 1000;

        const extractedData = {
          date, // 1. Date
          impressions, // 2. impressions
          clicks, // 3. click
          installs, // 4. installs
          revenueUsd, // 5. revenue(usd)
          revenueInr, // 6. revenue(inr)
          cpi, // 7. cpi
          ctr, // 8. ctr
          cr, // 9. cr
          eCpm: eCpm.toFixed(2), // 10. eCPM
        };

        dataToUpload.push(extractedData);
      });
    }
    console.log(dataToUpload);
    await db();

    const saveData = async () => {
      try {
        await Data.insertMany(dataToUpload);
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        await mongoose.disconnect()
        console.log("MongoDB connection closed");
      }
    };

    await saveData();
  }
}

main();
