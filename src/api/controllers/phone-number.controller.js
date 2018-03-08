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

    res.status(httpStatus.CREATED).json(savedPhoneNumber.transform());
  } catch (error) {
    next(PhoneNumber.checkDuplicate(error));
  }
};

/**
 * Find number
 * @public
 */
exports.query = async (req, res, next) => {
  try {
    const foundPhoneNumbers = await PhoneNumber.findByNumber(req.query.number);

    res.json({
      results: foundPhoneNumbers.map(phoneNumber => phoneNumber.transform())
    });
  } catch (error) {
    next(error);
  }
};
