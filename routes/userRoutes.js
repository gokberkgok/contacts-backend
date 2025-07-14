const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, registerUser, loginUser}  = require('../controllers/userController');

router.get('/', getUsers).post('/', createUser)
router.put('/:id', updateUser).put('/:id', deleteUser).get('/:id', getUser);
router.post('/register', registerUser).post('/login', loginUser)

module.exports = router;