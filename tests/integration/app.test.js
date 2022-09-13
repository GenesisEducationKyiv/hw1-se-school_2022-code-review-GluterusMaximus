import request from 'supertest';
import app from '../../src/app.js';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import { jest } from '@jest/globals';
import undici from 'undici';

const OLD_ENV = process.env;
const DATA_PATH = './data/emails.json';
let OLD_DATA;

beforeAll(async () => {
  try {
    OLD_DATA = await fs.readFile(DATA_PATH);
  } catch (error) {
    OLD_DATA = '[]';
  }

  const testAccount = await nodemailer.createTestAccount();

  process.env.SMTP_USER = testAccount.user;
  process.env.SMTP_PASSWORD = testAccount.pass;
  process.env.SMTP_HOST = testAccount.smtp.host;
  process.env.SMTP_PORT = String(testAccount.smtp.port);
  process.env.SMTP_SECURE = String(testAccount.smtp.secure);

  process.env.EXCHANGE_RATE_ENDPOINT =
    'https://api.apilayer.com/exchangerates_data/convert';
  process.env.EXCHANGE_RATE_APIKEY = 'd6ItBPKVQ5SOSQidukDUyhAPUzn9xOZJ';
});

beforeEach(async () => {
  try {
    await fs.writeFile(DATA_PATH, '[]');
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  jest.setTimeout(5000);
  process.env = OLD_ENV;

  await fs.writeFile(DATA_PATH, OLD_DATA);
});

describe('GET /rate', () => {
  jest.setTimeout(20000);
  it('should return the current rate', async () => {
    const config = {
      redirect: 'follow',
      headers: {
        apikey: process.env.EXCHANGE_RATE_APIKEY,
      },
      method: 'GET',
    };
    const roundLastDigits = (number, digits = 2) =>
      Math.round(number / 10 ** digits) * 10 ** digits;

    const { body } = await undici.request(
      `${process.env.EXCHANGE_RATE_ENDPOINT}?to=UAH&from=BTC&amount=1`,
      config
    );
    const {
      info: { rate },
    } = await body.json();

    const res = await request(app).get('/rate');

    expect(res.statusCode).toBe(200);
    expect(roundLastDigits(res.body)).toBe(roundLastDigits(rate));
  });
});

describe('POST /subscribe', () => {
  it('should subscribe an email', async () => {
    const res = await request(app)
      .post('/subscribe')
      .field('email', 'email@example.com');
    const emails = JSON.parse(await fs.readFile(DATA_PATH));

    expect(res.statusCode).toBe(200);
    expect(emails.includes('email@example.com')).toBe(true);
  });

  it('should throw an error on duplicate email', async () => {
    await request(app)
      .post('/subscribe')
      .field('email', 'duplicate@repeat.com');
    const res = await request(app)
      .post('/subscribe')
      .field('email', 'duplicate@repeat.com');
    const emails = JSON.parse(await fs.readFile(DATA_PATH));
    const duplicateCount = emails.filter(
      (email) => email === 'duplicate@repeat.com'
    ).length;

    expect(res.statusCode).toBe(409);
    expect(duplicateCount).toBe(1);
  });
});

describe('POST /sendEmails', () => {
  it('should send emails', async () => {
    await fs.writeFile(DATA_PATH, '["email1@email.com", "email2@email.com"]');

    const res = await request(app).post('/sendEmails');

    expect(res.statusCode).toBe(200);
    expect(res.body.notSent).toEqual([]);
  });
});
