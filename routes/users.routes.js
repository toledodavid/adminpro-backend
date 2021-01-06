/*
  Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_or_sameUser } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
  ],
  createUser
);

router.put('/:uid',
  [
    validateJWT,
    validateADMIN_ROLE_or_sameUser,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').not().isEmpty(),
    validateFields
  ],
  updateUser
);

router.delete('/:uid', [validateJWT, validateADMIN_ROLE], deleteUser);

module.exports = router;