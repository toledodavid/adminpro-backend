const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

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
    


    res.json({
      ok: true,
      message: 'LOOGIN'
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}



module.exports = {
  login
}