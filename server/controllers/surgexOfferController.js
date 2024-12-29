const surgexOffer = require("../modals/surgexOfferModal");

const getOfferData = async (req, res, next) => {
  try {
    const offerData = await surgexOffer.find({});
    res.status(200).json(offerData);
  } catch (error) {
    next(error);
  }
};

module.exports = { getOfferData };
