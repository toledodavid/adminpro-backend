/*
  Route: /api/all/:search
*/
const { Router } = require('express');
const { getSearchAll } = require('../controllers/searches.controller');

const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/:search', validateJWT, getSearchAll);



module.exports = router;