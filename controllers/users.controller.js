

const getUsers = (request, response) => {
  response.json({
    ok: true,
    users: []
  });
}

module.exports = {
  getUsers
}