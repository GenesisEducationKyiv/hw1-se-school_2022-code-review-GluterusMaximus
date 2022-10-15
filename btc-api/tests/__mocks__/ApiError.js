import { jest } from '@jest/globals';

const mock = jest.fn().mockImplementation(() => {
  return {
    status: 403,
    message: 'Forbidden',
    errors: [],
  };
});

export default mock;
