const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  impressions: {
    type: Number,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
  installs: {
    type: Number,
    required: true,
  },
  revenueUsd: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  revenueInr: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  cpi: {
    type: Number,
    required: true,
  },
  ctr: {
    type: Number,
    required: true,
  },
  cr: {
    type: Number,
    required: true,
  },
  eCpm: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => parseFloat(v.toString()).toFixed(2),
  },
});

dataSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.revenueUsd = parseFloat(ret.revenueUsd.toString());
    ret.revenueInr = parseFloat(ret.revenueInr.toString());
    ret.eCpm = parseFloat(ret.eCpm.toString());
    return ret;
  },
});

const mobavenue = mongoose.model("MobAvenue", dataSchema);

module.exports = mobavenue;
