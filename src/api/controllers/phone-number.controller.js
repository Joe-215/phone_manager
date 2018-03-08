const httpStatus = require('http-status');
const PhoneNumber = require('../models/phone-number.model');

/**
 * Create new number
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const number = new PhoneNumber(req.body);
    const savedPhoneNumber = await number.save();

    res.status(httpStatus.CREATED);
    res.json(savedPhoneNumber.transform());
  } catch (error) {
    next(PhoneNumber.checkDuplicate(error));
  }
};
