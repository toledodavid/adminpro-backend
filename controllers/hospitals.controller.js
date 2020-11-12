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

const updateHospital = async(request, res = response) => {

  const hospitalId = request.params.id;
  const uid = request.uid;

  try {

    const hospitalDB = await Hospital.findById(hospitalId);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any hospital found with that Id'
      });
    }


    const hospitalChanges = {
      ...request.body,
      user: uid
    }

    const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, hospitalChanges, {new: true});
    
    res.json({
      ok: true,
      hospital: hospitalUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}

const deleteHospital = async(request, res = response) => {
  
  const hospitalId = request.params.id;

  try {

    const hospitalDB = await Hospital.findById(hospitalId);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any hospital found with that Id'
      });
    }

    await Hospital.findByIdAndDelete(hospitalId);
    
    res.json({
      ok: true,
      message: 'Hospital deleted'
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
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}