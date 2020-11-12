/*
  Route: /api/hospitals
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');


const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getHospitals);

router.post('/',
  [
    validateJWT,
    check('name', 'Hospital name is required').not().isEmpty(),
    validateFields
  ],
  createHospital
);

router.put('/:id',
  [
    validateJWT,
    check('name', 'Hospital name is required').not().isEmpty(),
    validateFields
  ],
  updateHospital
);

router.delete('/:id', deleteHospital);

module.exports = router;
