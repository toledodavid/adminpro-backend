const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async(request, res = response) => {

  const hospitals = await Hospital.find().populate('user', 'name img');

  res.json({
    ok: true,
    hospitals
  });
}

const createHospital = async(request, res = response) => {

  const uid = request.uid;

  const hospital = new Hospital({...request.body, user: uid});
  
  try {

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

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