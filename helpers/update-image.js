const filesystem = require('fs');
const User = require('../models/user.model');
const Doctor = require('../models/doctors.model');
const Hospital = require('../models/hospital.model');


const deleteImage = (path) => {
  if (filesystem.existsSync(path)) {
    // Delete old image path
    filesystem.unlinkSync(path);
  }
}


const updateImage = async(collection, id, fileName) => {

  let oldPath = '';

  switch (collection) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found');
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImage(oldPath);

      doctor.img = fileName;
      await doctor.save();
      return true;
      break;

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('Hospital not found');
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;

    case 'users':
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found');
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;
      break;
  
    default:
      break;
  }

}


module.exports = {
  updateImage
}