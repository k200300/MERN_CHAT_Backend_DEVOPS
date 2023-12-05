const request = require('supertest');
const app = require('../index.js'); // Replace with the actual path to your Express app
const User = require('../models/userModel');

describe('User Controller', () => {
  describe('POST /login', () => {
    it('should log in a user', async () => {
      // Create a test user in the database
      const testUser = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });

      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body.status).toBe(true);
      expect(response.body.user).toBeDefined();
      // Add more assertions as needed
    });

    it('should handle login with incorrect credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'nonexistentuser',
          password: 'incorrectpassword',
        })
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBe('Incorrect Username or Password');
      // Add more assertions as needed
    });
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'newpassword',
        })
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body.status).toBe(true);
      expect(response.body.user).toBeDefined();
      // Add more assertions as needed
    });

    it('should handle registration with existing username or email', async () => {
      // Create a test user in the database
      await User.create({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: 'existingpassword',
      });

      const response = await request(app)
        .post('/register')
        .send({
          username: 'existinguser',
          email: 'existinguser@example.com',
          password: 'newpassword',
        })
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBeDefined();
      // Add more assertions as needed
    });
  });

  // Add more test cases for other endpoints in your user controller
  // (e.g., getAllUsers, setAvatar, logOut) following a similar structure.

  describe('GET /getAllUsers', () => {
    it('should get a list of all users', async () => {
      // Create test users in the database
      const users = [
        { username: 'user1', email: 'user1@example.com', password: 'password1' },
        { username: 'user2', email: 'user2@example.com', password: 'password2' },
      ];
      await User.create(users);

      const response = await request(app)
        .get('/getAllUsers')
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(users.length);
      // Add more assertions as needed
    });
  });

  describe('POST /setAvatar/:id', () => {
    it('should set the avatar for a user', async () => {
      // Create a test user in the database
      const testUser = await User.create({
        username: 'avataruser',
        email: 'avataruser@example.com',
        password: 'avatarpassword',
      });

      const response = await request(app)
        .post(`/setAvatar/${testUser._id}`)
        .send({
          image: 'base64encodedimage', // Replace with a valid base64 encoded image
        })
        .expect(200);

      // Add assertions based on the expected response format
      expect(response.body.isSet).toBe(true);
      expect(response.body.image).toBeDefined();
      // Add more assertions as needed
    });
  });

  describe('GET /logOut/:id', () => {
    it('should log out a user', async () => {
      // Create a test user in the database
      const testUser = await User.create({
        username: 'logoutuser',
        email: 'logoutuser@example.com',
        password: 'logoutpassword',
      });

      const response = await request(app)
        .get(`/logOut/${testUser._id}`)
        .expect(200);

      // Add assertions based on the expected response format
      // Ensure that the user is successfully logged out
      // Add more assertions as needed
    });
  });
});
