const { response } = require('express');
const User = require('../models/user.model');


const getUsers = async(request, res) => {

  const users = await User.find({}, 'name email role google');

  res.json({
    ok: true,
    users
  });
}

const createUser = async (request, res = response) => {

  const { name, email, password } = request.body;

  const existEmail = await User.findOne({email});

  if (existEmail) {
    return res.status(400).json({
      ok: false,
      message: `This email (${email}) already exists.`
    });
  }

  try {

    const user = new User(request.body);

    await user.save();

    res.json({
      ok: true,
      user
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Unexpected error ... check logs.'
    });
  }

}

module.exports = {
  getUsers,
  createUser
}