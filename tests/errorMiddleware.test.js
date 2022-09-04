import errorMiddleware from '../src/middlewares/errorMiddleware.js';
import ApiError from '../src/errors/ApiError.js';
import MockApiError from './__mocks__/ApiError.js';
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

test('should return a correct status for an api error', () => {
  const error = new MockApiError();
  Object.setPrototypeOf(error, ApiError.prototype);
  const mockRequest = { body: 'Some other data' };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    end: jest.fn(() => mockResponse),
  };

  errorMiddleware(error, mockRequest, mockResponse, jest.fn());

  expect(mockResponse.status).toHaveBeenCalledWith(403);
});
