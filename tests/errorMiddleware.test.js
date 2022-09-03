import errorMiddleware from '../src/middlewares/errorMiddleware.js';
import { jest } from '@jest/globals';

test('should return code 500 for a non-api error', () => {
  const error = new Error('Unexpected error');
  const mockRequest = { body: 'Some data' };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    end: jest.fn(() => mockResponse),
  };

  errorMiddleware(error, mockRequest, mockResponse, jest.fn());

  expect(mockResponse.status).toHaveBeenCalledWith(500);
});
