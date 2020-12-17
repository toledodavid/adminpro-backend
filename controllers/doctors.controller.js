const { response } = require('express');
const Doctor = require('../models/doctors.model');

const getDoctors = async(request, res = response) => {

  const doctors = await Doctor.find().populate('user', 'name img').populate('hospital', 'name img');

  res.json({
    ok: true,
    doctors
  });
}

const getDoctorById = async(request, res = response) => {

  const IdDoctor = request.params.id;

  try {

    const doctor = await Doctor.findById(IdDoctor).populate('user', 'name img').populate('hospital', 'name img');

    res.json({
      ok: true,
      doctor
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

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

const deleteDoctor = async(request, res = response) => {
  
  const IdDoctor = request.params.id;

  try {

    const doctorDB = await Doctor.findById(IdDoctor);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        message: 'Any doctor found with that Id'
      });
    }

    await Doctor.findByIdAndDelete(IdDoctor);
    
    res.json({
      ok: true,
      message: 'Doctor deleted'
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
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
}