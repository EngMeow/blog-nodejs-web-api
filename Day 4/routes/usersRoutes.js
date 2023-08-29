const express = require('express');
const {
  getAllUsers,
  addUser,
  editUser,
  deleteUser,
  getUser,
  loginUser,
} = require('../controllers/userControllers');
const authenticateToken = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Public routes
router.post('/login', loginUser); // User login route (no authentication required)
router.post('/', addUser); // Add a new user

// Protected routes
router.use(authenticateToken); // Apply authentication middleware to all routes below

router.get('/', getAllUsers); // Fetch all users
router.get('/:email', getUser); // Fetch user by email
router.put('/:email', editUser); // Edit user data
router.delete('/:email', deleteUser); // Delete user account

module.exports = router;