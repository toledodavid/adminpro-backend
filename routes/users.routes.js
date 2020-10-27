/*
  Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controllers/users.controller');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);

router.post('/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
  ],
  createUser
);



module.exports = router;