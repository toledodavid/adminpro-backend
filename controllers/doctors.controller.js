const { response } = require('express');

const getDoctors = (request, res = response) => {
  res.json({
    ok: true,
    message: 'getDoctors'
  });
}

const createDoctor = (request, res = response) => {
  res.json({
    ok: true,
    message: 'createDoctor'
  });
}

const updateDoctor = (request, res = response) => {
  res.json({
    ok: true,
    message: 'updateDoctor'
  });
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