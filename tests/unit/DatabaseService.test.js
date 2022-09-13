import { jest } from '@jest/globals';
import fsp from 'fs/promises';
import fs from 'fs';
import DatabaseService from '../../src/services/DatabaseService';
import path from 'path';
jest.mock('fs/promises');
jest.mock('fs');
const databaseService = new DatabaseService();

describe('Database subscription', () => {
  it('should subscribe an email with no errors', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    fsp.readFile = jest
      .fn()
      .mockReturnValue(
        Promise.resolve(
          JSON.stringify(['example1@gmail.com', 'example2@gmail.com'])
        )
      );
    jest
      .spyOn(fsp, 'writeFile')
      .mockImplementation(() => Promise.resolve(undefined));

    await databaseService.subscribe('test@test.com');

    expect(fsp.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify([
        'example1@gmail.com',
        'example2@gmail.com',
        'test@test.com',
      ])
    );
  });

  it('should throw error on duplicate email', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    fsp.readFile = jest
      .fn()
      .mockReturnValue(
        Promise.resolve(
          JSON.stringify(['duplicate@gmail.com', 'example@gmail.com'])
        )
      );

    await expect(
      databaseService.subscribe('duplicate@gmail.com')
    ).rejects.toThrow();
  });

  it('should create database files/folder if none exist', async () => {
    fs.existsSync = jest.fn().mockReturnValue(false);
    jest
      .spyOn(fsp, 'mkdir')
      .mockImplementation(() =>
        Promise.resolve(path.resolve(process.cwd(), './data'))
      );
    jest
      .spyOn(fsp, 'writeFile')
      .mockImplementation(() => Promise.resolve(undefined));

    await databaseService.subscribe('first@test.com');

    expect(fsp.mkdir).toHaveBeenCalled();
    expect(fsp.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(['first@test.com'])
    );
  });
});

describe('Getting emails from the database', () => {
  it('should get emails with no errors', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    fsp.readFile = jest
      .fn()
      .mockReturnValue(
        Promise.resolve(
          JSON.stringify(['hello@hello.hello', 'IamAn@email.com'])
        )
      );

    const emails = await databaseService.getEmails();

    expect(emails).toEqual(['hello@hello.hello', 'IamAn@email.com']);
  });

  it("should return an empty array if database files don't exist", async () => {
    fs.existsSync = jest.fn().mockReturnValue(false);

    const emails = await databaseService.getEmails();

    expect(emails).toEqual([]);
  });
});
