const { response } = require('express');
const Doctor = require('../models/doctors.model');

const getDoctors = async(request, res = response) => {

  const doctors = await Doctor.find().populate('user', 'name img').populate('hospital', 'name img');

  res.json({
    ok: true,
    doctors
  });
}

const createDoctor = async(request, res = response) => {

  const uid = request.uid;
  
  const doctor = new Doctor({...request.body, user: uid});

  try {

    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}

const updateDoctor = async(request, res = response) => {
  
  const idDoctor = request.params.id;
  const uid = request.uid;

  try {

    const doctorDB = await Doctor.findById(idDoctor);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any Doctor found with that Id'
      });
    }


    const doctorChanges = {
      ...request.body,
      user: uid
    }

    const doctorUpdated = await Doctor.findByIdAndUpdate(idDoctor, doctorChanges, {new: true});
    
    res.json({
      ok: true,
      doctor: doctorUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}

const deleteDoctor = (request, res = response) => {
  res.json({
    ok: true,
    message: 'deleteDoctor'
  });
}


module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
}