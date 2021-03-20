const supertest = require('supertest');
const { app } = require('../app');

describe('app.js', () => {
  let request;
  let response;

  beforeAll(() => {
    request = supertest(app);
  });

  [
    {
      headerKey: 'x-forwarded-for',
      expectedIP: '123.123.123.123'
    },
    {
      headerKey: 'x-forwarded',
      expectedIP: '123.123.123.124'
    },
    {
      headerKey: 'forwarded-for',
      expectedIP: '123.123.123.125'
    },
    {
      headerKey: 'forwarded',
      expectedIP: '123.123.123.126'
    },
    {
      headerKey: 'x-client-ip',
      expectedIP: '123.123.123.127'
    },
    {
      headerKey: 'x-real-ip',
      expectedIP: '123.123.123.128'
    },
    {
      headerKey: 'cf-connecting-ip',
      expectedIP: '123.123.123.129'
    },
    {
      headerKey: 'fastly-client-ip',
      expectedIP: '123.123.123.130'
    },
    {
      headerKey: 'true-client-ip',
      expectedIP: '123.123.123.131'
    },
    {
      headerKey: 'x-cluster-client-ip',
      expectedIP: '123.123.123.132'
    }
  ].forEach(test => {
    describe(`IP - ${test.expectedIP}`, () => {
      beforeEach(async () => {
        response = await request.get('/').set(test.headerKey, test.expectedIP);
      });

      it('returns expected status', () => {
        expect(response.status).toBe(200);
      });

      it('returns epxected body', () => {
        expect(response.text).toEqual(test.expectedIP);
      });
    });
  });
});
