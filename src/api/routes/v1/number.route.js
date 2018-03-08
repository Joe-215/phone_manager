const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/phone-number.controller');
const { create, query } = require('../../validations/number.validation');

const router = express.Router();

router.route('/').post(validate(create), controller.create);
router.route('/query').get(validate(query), controller.query);

module.exports = router;
