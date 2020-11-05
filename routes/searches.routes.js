/*
  Route: /api/all
*/
const { Router } = require('express');
const { getSearchAll, getSearchByCollection } = require('../controllers/searches.controller');

const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/:search', validateJWT, getSearchAll);
router.get('/collection/:collection/:search', validateJWT, getSearchByCollection);



module.exports = router;