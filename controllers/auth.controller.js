const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(request, res = response) => {

  const { email, password } = request.body;

  try {

    const userDB = await User.findOne({email});

    // Verify email
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password'
      });
    }

    // Generate TOKEN - JWT (json web token)
    const token = await generateJWT(userDB._id);


    res.json({
      ok: true,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}


const googleSignIn = async(request, res = response) => {

  const googleToken = request.body.token;

  try {

    const {name, email, picture} = await googleVerify(googleToken);

    res.json({
      ok: true,
      message: 'Google SignIn',
      googleToken,
      name,
      email,
      picture
    });
    
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Invalid token'
    });
  }

}



module.exports = {
  login,
  googleSignIn
}