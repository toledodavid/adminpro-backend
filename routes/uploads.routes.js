/*
  Route: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { uploadFile } = require('../controllers/uploads.controller');

const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', validateJWT, uploadFile);



module.exports = router;