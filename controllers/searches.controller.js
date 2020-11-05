const { response } = require('express');


const getSearchAll = (request, res = response) => {
  const search = request.params.search;

  res.json({
    ok: true,
    message: search
  });
}



module.exports = {
  getSearchAll
}