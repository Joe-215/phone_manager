/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const { isMatch } = require('lodash');

const app = require('../../../index');
const PhoneNumber = require('../../models/phone-number.model');

describe('PhoneNumbers API', async () => {
  let dbPhoneNumbers;
  let phoneNumber;

  beforeEach(async () => {
    dbPhoneNumbers = {
      davidPersonal: {
        name: 'David Leong',
        number: '+12345678901',
        context: 'personal'
      },
      johnPersonal: {
        name: 'John Doe',
        number: '+18390293854',
        context: 'personal'
      }
    };

    phoneNumber = {
      name: 'David Leong',
      number: '+12345678901',
      context: 'office'
    };

    await PhoneNumber.remove({});
    await PhoneNumber.insertMany([
      dbPhoneNumbers.davidPersonal,
      dbPhoneNumbers.johnPersonal
    ]);
  });

  describe('POST /v1/number', () => {
    it('should create a new phone number when request is ok', () => {
      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(isMatch(res.body, phoneNumber)).to.be.true;
        });
    });

    it('should report error when pair of phone number and context already exists', () => {
      phoneNumber.number = dbPhoneNumbers.davidPersonal.number;
      phoneNumber.context = dbPhoneNumbers.davidPersonal.context;

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.CONFLICT)
        .then(res => {
          const { messages } = res.body.errors[0];

          expect(messages).to.include(
            'Combination of "number" and "context" already exists'
          );
        });
    });

    it('should report error when name is not provided', () => {
      delete phoneNumber.name;

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('name');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"name" is required');
        });
    });

    it('should report error when number is not provided', () => {
      delete phoneNumber.number;

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('number');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"number" is required');
        });
    });

    it('should report error when number is not in E.164 format', () => {
      phoneNumber.number = '123456789';

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('number');
          expect(location).to.be.equal('body');
          expect(messages).to.include(
            `"number" with value "${
              phoneNumber.number
            }" fails to match the E.164 pattern`
          );
        });
    });

    it('should report error when number is not provided', () => {
      delete phoneNumber.context;

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('context');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"context" is required');
        });
    });

    it('should report error when context length is less than 3', () => {
      phoneNumber.context = 'aa';

      return request(app)
        .post('/v1/number')
        .send(phoneNumber)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('context');
          expect(location).to.be.equal('body');
          expect(messages).to.include(
            '"context" length must be at least 3 characters long'
          );
        });
    });
  });

  describe('GET /v1/number/query', () => {
    beforeEach(async () => {
      await PhoneNumber.insertMany([phoneNumber]);
    });

    it('should filter phoneNumbers', () => {
      return request(app)
        .get('/v1/number/query')
        .query({ number: phoneNumber.number })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('results');
          expect(res.body.results).to.be.an('array');
          expect(res.body.results).to.have.lengthOf(2);

          expect(isMatch(res.body.results[0], phoneNumber)).to.be.true;
          expect(isMatch(res.body.results[1], dbPhoneNumbers.davidPersonal)).to
            .be.true;
        });
    });

    it('should report error when query is not provided', () => {
      delete phoneNumber.number;

      return request(app)
        .get('/v1/number/query')
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('number');
          expect(location).to.be.equal('query');
          expect(messages).to.include('"number" is required');
        });
    });

    it('should report error when number is not in E.164 format', () => {
      phoneNumber.number = '123456789';

      return request(app)
        .get('/v1/number/query')
        .query({ number: phoneNumber.number })
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.errors[0];

          expect(field).to.be.equal('number');
          expect(location).to.be.equal('query');
          expect(messages).to.include(
            `"number" with value "${
              phoneNumber.number
            }" fails to match the E.164 pattern`
          );
        });
    });
  });
});
