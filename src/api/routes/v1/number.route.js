const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/phone-number.controller');
const { create, query } = require('../../validations/number.validation');

const router = express.Router();

/**
 *  @swagger
 *  /number:
 *    post:
 *      tags:
 *        - create
 *      description: Creates phone number
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        required: true
 *        description: "Phone number object to create"
 *        schema:
 *          $ref: "#/definitions/NewPhoneNumber"
 *      responses:
 *        400:
 *          description: Validation error
 *        409:
 *          description: Duplicate error
 *        201:
 *          description: Phone number object created
 *          schema:
 *            $ref: "#/definitions/PhoneNumber"
 */
router.route('/').post(validate(create), controller.create);

/**
 *  @swagger
 *  /number/query:
 *    get:
 *      tags:
 *        - query
 *      description: Finds phone numbers
 *      parameters:
 *      - in: "query"
 *        name: "number"
 *        required: true
 *        description: "Phone number to search by"
 *        schema:
 *          type: string
 *          pattern: '^\+[1-9]\d{6,14}$'
 *      responses:
 *        400:
 *          description: Validation error
 *        200:
 *          description: Phone number object created
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/PhoneNumber"
 */
router.route('/query').get(validate(query), controller.query);

module.exports = router;
