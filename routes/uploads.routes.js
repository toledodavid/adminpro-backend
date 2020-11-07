/*
  Route: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { uploadFile, returnImage } = require('../controllers/uploads.controller');

const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', validateJWT, uploadFile);

router.get('/:collection/:image', returnImage);


module.exports = router;