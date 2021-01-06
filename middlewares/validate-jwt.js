const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const validateJWT = (request, res = response, next) => {

  // Read token
  const token = request.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is not token in request'
    });
  }

  try {

    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    request.uid = uid;

    next();
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    });
  }

}


const validateADMIN_ROLE = async(request, res = response, next) => {
  
  const uid = request.uid;
  
  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'User does not exist'
      });
    }

    if (userDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        message: 'Denied access'
      });
    }
    
    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}


const validateADMIN_ROLE_or_sameUser = async(request, res = response, next) => {
  
  const uid = request.uid;
  const id = request.params.uid;
  
  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'User does not exist'
      });
    }

    if (userDB.role === 'ADMIN_ROLE' || uid === id) {

      next();
      
    } else {
      return res.status(403).json({
        ok: false,
        message: 'Denied access'
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}


module.exports = {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_sameUser
}