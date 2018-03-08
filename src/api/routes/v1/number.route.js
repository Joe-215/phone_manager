const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/phone-number.controller');
const { create } = require('../../validations/number.validation');

const router = express.Router();

router.route('/').post(validate(create), controller.create);

module.exports = router;
