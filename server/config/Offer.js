const axios = require("axios");
const mongoose = require("mongoose");
const surgexOffer = require("../modals/surgexOfferModal");
const FormData = require("form-data");
const { DateTime } = require("luxon");

const mongoURI =
  "mongodb+srv://suryanshsinghal:kali@cluster0.s4wicgt.mongodb.net/bob-krafton-dashboard";

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

async function getOfferStats(apiKey, accessHeader) {
  const url2 = "https://api-surgex.affise.com/3.0/stats/custom";

  const yesterday = DateTime.local().minus({ days: 1 }).toISODate();

  const params = {
    "filter[date_from]": "2024-01-01",
    "filter[date_to]": yesterday,
    timezone: "Asia/Kolkata",
    "slice[]": "offer",
    "fields[]": [
      "clicks",
      "hosts",
      "earnings",
      "income",
      "noincome",
      "payouts",
      "conversions",
      "cr",
      "ratio",
      "epc",
      "affiliate_epc",
      "views",
    ],
    limit: 500,
  };

  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "api-key": apiKey,
    authorization: `Bearer ${accessHeader}`,
    "cache-control": "no-cache",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
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

async function dataManipulation(result) {
  const dataToUpload = [];
  if (result.status === 1) {
    const dataToWrite = result.stats;
    dataToWrite.forEach((data) => {
      const id = data.slice.offer.id;
      const title = data.slice.offer.title;
      const status = data.slice.offer.status;
      const impressions = data.views;

      const clicks = parseInt(data.traffic.raw, 10);
      const installs = data.actions.confirmed.count;
      const revenueUsd = parseFloat(data.actions.confirmed.revenue).toFixed(2);
      const revenueInr = revenueUsd * 83;
      const cpi = revenueInr / installs || 0;
      const ctr = clicks / impressions || 0;
      const cr = installs / clicks || 0;
      const eCpm = (revenueInr / impressions) * 1000 || 0;

      const extractedData = {
        id, // id
        title, // title
        status, // status
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
  return dataToUpload;
}

async function connectTodb() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

const upsertData = async (dataArray) => {
  const upsertPromises = dataArray.map((data) =>
    surgexOffer.findOneAndUpdate({ id: data.id }, data, {
      new: true,
      upsert: true,
      useFindAndModify: false,
    })
  );

  try {
    const results = await Promise.all(upsertPromises);
    console.log("Upserted documents:", results);
  } catch (err) {
    console.error("Error upserting documents:", err);
  }
};

const closeMongoDBConnection = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error disconnecting from MongoDB:", err);
  }
};

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
  const accessHeader = signinResult.access_header;
  const apiKey = signinResult.api_key.trim();
  const result = await getOfferStats(apiKey, accessHeader);
  const dataArray = await dataManipulation(result);
  await connectTodb();
  await upsertData(dataArray);
  await closeMongoDBConnection();
}
main();
