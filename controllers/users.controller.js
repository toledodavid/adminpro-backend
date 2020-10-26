const User = require('../models/user.model');


const getUsers = async(request, response) => {

  const users = await User.find({}, 'name email role google');

  response.json({
    ok: true,
    users
  });
}

const createUser = async (request, response) => {

  const { name, email, password } = request.body;

  const user = new User(request.body);

  await user.save();

  response.json({
    ok: true,
    user
  });
}

module.exports = {
  getUsers,
  createUser
}