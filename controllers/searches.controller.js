const { response } = require('express');
const User = require('../models/user.model');
const Doctor = require('../models/doctors.model');
const Hospital = require('../models/hospital.model');


const getSearchAll = async(request, res = response) => {

  const search = request.params.search;

  const regularExpresion = RegExp(search, 'i');

  // const users = await User.find({name: regularExpresion});
  // const doctors = await Doctor.find({name: regularExpresion});
  // const hospitals = await Hospital.find({name: regularExpresion});

  const [users, doctors, hospitals] = await Promise.all([
    User.find({name: regularExpresion}),
    Doctor.find({name: regularExpresion}),
    Hospital.find({name: regularExpresion})
  ]);

  res.json({
    ok: true,
    users,
    doctors,
    hospitals
  });
}



module.exports = {
  getSearchAll
}