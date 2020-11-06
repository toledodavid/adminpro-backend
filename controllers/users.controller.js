const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(request, res) => {

  const fromThe = Number(request.query.from_the) || 0;

  const [users, total] = await Promise.all([
    User.find({}, 'name email role google img').skip(fromThe).limit(5),
    User.countDocuments()
  ]);

  res.json({
    ok: true,
    users,
    total
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

    // Generate TOKEN - JWT (json web token)
    const token = await generateJWT(user._id);

    res.json({
      ok: true,
      user,
      token
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