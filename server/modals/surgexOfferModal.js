const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", null],
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
      type: Number,
      required: true,
    },
    revenueInr: {
      type: Number,
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
      type: Number,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const surgexOffer = mongoose.model("surgexOffer", offerSchema);

module.exports = surgexOffer;
