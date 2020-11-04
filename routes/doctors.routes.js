/*
  Route: /api/doctors
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.controller');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getDoctors);

router.post('/',
  [
    validateJWT,
    check('name', 'Doctor name is required').not().isEmpty(),
    check('hospital', 'Id hospital must be valid').isMongoId(),
    validateFields
  ],
  createDoctor
);

router.put('/:id',
  [],
  updateDoctor
);

router.delete('/:id', deleteDoctor);

module.exports = router;