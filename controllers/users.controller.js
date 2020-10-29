const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


const getUsers = async(request, res) => {

  const users = await User.find({}, 'name email role google');

  res.json({
    ok: true,
    users
  });
}

const createUser = async (request, res = response) => {

  const { email, password } = request.body;

  const existEmail = await User.findOne({email});

  if (existEmail) {
    return res.status(400).json({
      ok: false,
      message: `This email (${email}) already exists.`
    });
  }

  try {

    const user = new User(request.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user in Mongo Atlas
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

const updateUser = async (request, res = response) => {

  // TODO: Validate token and confirm if the user is correct

  const uid = request.params.uid;

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any user with that uid'
      });
    }

    const {password, email, ...fields} = request.body;

    if (userDB.email !== email) {
      const emailExist = await User.findOne({email: email});
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          message: 'This email already exist'
        });
      }
    }

    fields.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

    res.json({
      ok: true,
      user: userUpdated
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}

const deleteUser = async(request, res = response) => {

  const uid = request.params.uid;

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any user with that uid'
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      message: 'User deleted'
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}