import { jest } from '@jest/globals';
import undici from 'undici';
import RateService from '../../src/services/RateService';
jest.mock('undici');

describe('Getting currency rate', () => {
  const rateService = new RateService();

  it('should return the rate with no errors', async () => {
    jest.spyOn(undici, 'request').mockReturnValue(
      Promise.resolve({
        statusCode: 200,
        body: {
          json: () =>
            Promise.resolve({
              info: {
                rate: 9999.9,
              },
            }),
        },
      })
    );

    const rate = await rateService.getRate();

    expect(undici.request).toHaveBeenCalled();
    expect(rate).toBe(10000);
  });

  it('should throw on error statusCode', async () => {
    undici.request = jest.fn().mockReturnValue(
      Promise.resolve({
        statusCode: 400,
      })
    );

    await expect(rateService.getRate()).rejects.toThrow();
  });
});
