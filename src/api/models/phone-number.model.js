const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { pick } = require('lodash');

const APIError = require('../utils/APIError');

/**
 * PhoneNumber Schema
 * @private
 */
const phoneNumberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 128,
      index: true,
      trim: true
    },
    number: {
      type: String,
      match: /^\+[1-9]\d{6,14}$/, // E.164 format
      index: true,
      required: true,
      unique: true,
      trim: true
    },
    context: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 16,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

// Composite unique key on the pair of (number, context)
phoneNumberSchema.index({ number: 1, context: 1 }, { unique: true });

/**
 * Methods
 */
phoneNumberSchema.method({
  transform() {
    const fields = ['id', 'name', 'number', 'context', 'createdAt'];

    return pick(this, fields);
  }
});

/**
 * Statics
 */
phoneNumberSchema.statics = {
  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicate(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Number Duplicate Error',
        errors: [
          {
            field: 'number',
            messages: ['Combination of "number" and "context" already exists']
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }

    return error;
  }
};

/**
 * @typedef PhoneNumber
 */
module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
