import ApiError from '../../src/errors/ApiError';

describe('Api errors tests', () => {
  it('should have proper structure', () => {
    const error = new ApiError(404, 'Not found', [
      'The resource was not found',
    ]);

    expect(error)
      .toBeInstanceOf(Error)
      .toMatchObject({
        status: 404,
        message: 'Not found',
        errors: ['The resource was not found'],
      });
  });

  it('should work with no errors passed', () => {
    const error = new ApiError(409, 'Conflict');

    expect(error.errors).toEqual([]);
  });

  it('should properly create a badRequest error', () => {
    const error = ApiError.badRequest('Invalid data');

    expect(error).toMatchObject({
      status: 400,
      message: 'Invalid data',
      errors: [],
    });
  });

  it('should properly create a notFound error', () => {
    const error = ApiError.notFound();

    expect(error).toMatchObject({
      status: 404,
      message: 'Not Found',
      errors: [],
    });
  });
});
