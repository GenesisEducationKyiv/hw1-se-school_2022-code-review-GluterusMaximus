import app from '../../src/app.js';
import { jest } from '@jest/globals';

describe('Main entry file test', () => {
  const OLD_ENV = process.env;

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should call app listen at least once and use the port from the environment', async () => {
    jest
      .spyOn(app, 'listen')
      .mockImplementation((_port, callback) => callback());
    process.env.PORT = 5000;

    await import('../../src/index.js');

    expect(app.listen).toHaveBeenLastCalledWith(5000, expect.any(Function));
  });
});
