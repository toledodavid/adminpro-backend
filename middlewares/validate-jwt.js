const { response } = require('express');
const jwt = require('jsonwebtoken');


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


module.exports = {
  validateJWT
}