import { validateEmail } from '../../src/utils/validators';

describe('Validator functions test', () => {
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'master.deliberator@gmail.com',
      'aaaa@aaa.ua',
      'example@example.com',
      'test/test@test.com',
      'mailhost!username@example.org',
    ];

    const validationResults = validEmails
      .map((email) => validateEmail(email))
      .every((isValid) => isValid);

    expect(validationResults).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    const invalidEmails = [
      'justAPlainstring',
      'email@with. spaces ',
      'noAtSign.com',
      'forbiddenSymbol¤@test.org',
      '',
    ];

    const validationResults = invalidEmails
      .map((email) => validateEmail(email))
      .every((isValid) => !isValid);

    expect(validationResults).toBe(false);
  });
});
