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

const getSearchByCollection = async(request, res = response) => {

  const collection = request.params.collection;
  const search = request.params.search;

  const regularExpresion = RegExp(search, 'i');

  let data = [];

  switch (collection) {
    case 'doctors':
      data = await Doctor.find({name: regularExpresion}).populate('user', 'name img').populate('hospital', 'name img');
      break;

    case 'hospitals':
      data = await Hospital.find({name: regularExpresion}).populate('user', 'name img');
      break;

    case 'users':
      data = await User.find({name: regularExpresion});
      break;
  
    default:
      return res.status(400).json({
        ok: false,
        message: 'Invalid collection in request'
      });
  }


  res.json({
    ok: true,
    result: data
  });

}



module.exports = {
  getSearchAll,
  getSearchByCollection
}