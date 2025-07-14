const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, registerUser, loginUser,currentUser}  = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
router.get('/', getUsers).post('/', createUser).get('/current', validateToken, currentUser);
router.put('/:id', updateUser).put('/:id', deleteUser).get('/:id', getUser);
router.post('/register', registerUser).post('/login', loginUser)

module.exports = router;