const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const registerValidation = require('../validators/registerValidator');
const { 
     getUsers, 
     getUser, 
     createUser,
     updateUser, 
     deleteUser, 
     registerUser, 
     loginUser,
     currentUser
}  = require('../controllers/userController');
 
const validateToken = require('../middleware/validateTokenHandler');
//router.use(validateToken);

router.get('/', validateToken, getUsers);
router.get('/current', validateToken, currentUser);
router.get('/:id', validateToken,  getUser);
router.post('/', validateToken, createUser);
router.put('/:id', validateToken, updateUser);
router.delete('/:id', validateToken, deleteUser);
router.post('/register',registerValidation, registerUser);
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı oluşturuldu
 *       400:
 *         description: Hatalı veri
 */

module.exports = router;