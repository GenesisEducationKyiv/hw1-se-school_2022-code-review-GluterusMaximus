import request from 'supertest';
import app from '../../src/app.js';
import nodemailer from 'nodemailer';
import { jest } from '@jest/globals';

const OLD_ENV = process.env;

beforeAll(async () => {
  const testAccount = await nodemailer.createTestAccount();

  process.env.SMTP_USER = testAccount.user;
  process.env.SMTP_PASSWORD = testAccount.pass;
  process.env.SMTP_HOST = testAccount.smtp.host;
  process.env.SMTP_PORT = String(testAccount.smtp.port);
  process.env.SMTP_SECURE = String(testAccount.smtp.secure);
});

afterAll(() => {
  jest.setTimeout(5000);
  process.env = OLD_ENV;
});

describe('GET /rate', () => {
  jest.setTimeout(15000);
  it('should return the current rate', async () => {
    const res = await request(app).get('/rate');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Number));
  });
});

describe('POST /subscribe', () => {
  it('should subscribe an email', async () => {
    jest.setTimeout(15000);

    const res = await request(app)
      .post('/subscribe')
      .field('email', 'email@example.com');

    expect(res.statusCode).toBe(200);
  });
});

describe('POST /sendEmails', () => {
  it('should send emails', async () => {
    jest.setTimeout(15000);

    const res = await request(app).post('/sendEmails');

    expect(res.statusCode).toBe(200);
    expect(res.body.notSent).toEqual([]);
  });
});
