import { createAccount, loginUser, logoutUser, deleteUserAccount } from './authServerAPICalls'; // Adjust the import path

describe('Account creation and login tests', () => {
  const testEmail = `testuser-${Date.now()}@example.com`; // Use a unique email for each test run
  const testPassword = 'TestPassword123';
  let token: string;

  afterAll(async () => {
    // delete the user, and verify that the user was deleted
    await expect(deleteUserAccount()).resolves.not.toThrow();
  });

  test('Create a new user account', async () => {
    await expect(createAccount(testEmail, testPassword)).resolves.not.toThrow();
  });

  test('Log in with the new account', async () => {
    await expect(loginUser({ email: testEmail, password: testPassword })).resolves.not.toThrow();
  });

  test('Log out the new account', async () => {
    await expect(logoutUser()).resolves.not.toThrow();
  });

  // Optional: Additional tests can be added here
});