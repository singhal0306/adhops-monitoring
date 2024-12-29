const mobmodal = require("../modals/mobAvenueModal");
const { Decimal128 } = require("mongodb");

const getDateListPast14Days = () => {
  const dateList = [];
  const today = new Date();

  for (let i = 14; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dateList.push(`${day}-${month}-${year}`);
  }

  const lastWeek = dateList.slice(0, 7); // Get the first half of the array
  const thisWeek = dateList.slice(7);
  return { lastWeek, thisWeek };
};

const convertToSortableDate = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

const weekList = () => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const last7Days = [];

  const today = new Date();
  for (let i = 7; i >= 1; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i); // Subtract i days from today
    const dayOfWeek = daysOfWeek[day.getDay()]; // Get abbreviated day name
    last7Days.push(dayOfWeek);
  }
  return last7Days;
};

const decimal128ToNumber = (decimal128) => {
  return decimal128 ? parseFloat(decimal128.toString()) : 0;
};

const sumFields = (array) => {
  // Initialize variables to hold totals
  let impressionsTotal = 0;
  let clicksTotal = 0;
  let installsTotal = 0;
  let revenueUsdTotal = 0;
  let revenueInrTotal = 0;

  // Iterate through each object in the array
  array.forEach((obj) => {
    impressionsTotal += obj.impressions || 0;
    clicksTotal += obj.clicks || 0;
    installsTotal += obj.installs || 0;
    revenueUsdTotal += decimal128ToNumber(obj.revenueUsd);
    revenueInrTotal += decimal128ToNumber(obj.revenueInr);
    // Add more fields if needed
  });

  // Return an object with the summed totals
  return {
    impressions: impressionsTotal,
    clicks: clicksTotal,
    installs: installsTotal,
    revenueUsd: revenueUsdTotal,
    revenueInr: revenueInrTotal,
    // Add more fields as needed
  };
};

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dates = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const year = d.getFullYear();
    dates.push(`${day}-${month}-${year}`);
  }

  return dates;
};

const getData = async (req, res, next) => {
  try {
    const { thisWeek, lastWeek } = getDateListPast14Days();
    const thisResult = await mobmodal.find({ date: { $in: thisWeek } });

    const sortedThisResults = thisResult.sort((a, b) => {
      const dateA = convertToSortableDate(a.date);
      const dateB = convertToSortableDate(b.date);
      return dateA.localeCompare(dateB);
    });

    const lastResult = await mobmodal.find({ date: { $in: lastWeek } });

    const sortedLastResults = lastResult.sort((a, b) => {
      const dateA = convertToSortableDate(a.date);
      const dateB = convertToSortableDate(b.date);
      return dateA.localeCompare(dateB);
    });

    const summedData = sumFields(sortedThisResults);
    const weeksList = weekList();

    res
      .status(200)
      .json({ sortedThisResults, sortedLastResults, summedData, weeksList });
  } catch (error) {
    next(error);    
  }
};

const getDateWiseData = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  try {
    const dateList = getDatesInRange(startDate, endDate);
    const thisResult = await mobmodal.find({ date: { $in: dateList } });

    const filteredResults = thisResult.sort((a, b) => {
      const dateA = convertToSortableDate(a.date);
      const dateB = convertToSortableDate(b.date);
      return dateA.localeCompare(dateB);
    });

    const summedData = sumFields(filteredResults);

    res.status(200).json({ filteredResults, summedData});
  } catch (error) {
    next(error);
  }
};

module.exports = { getData, getDateWiseData };
