const { body } = require('express-validator');

//Validation rules
const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Kullanıcı adı boş olamaz'),

  body('email')
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi girin'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalı')
];

module.exports = registerValidation;