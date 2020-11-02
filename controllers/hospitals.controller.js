const { response } = require('express');


const getHospitals = (request, res = response) => {
  res.json({
    ok: true,
    message: 'getHospitals'
  });
}

const createHospital = (request, res = response) => {
  res.json({
    ok: true,
    message: 'createHospital'
  });
}

const updateHospital = (request, res = response) => {
  res.json({
    ok: true,
    message: 'updateHospital'
  });
}

const deleteHospital = (request, res = response) => {
  res.json({
    ok: true,
    message: 'deleteHospital'
  });
}



module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}