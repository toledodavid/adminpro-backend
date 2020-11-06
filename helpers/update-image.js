const filesystem = require('fs');
const User = require('../models/user.model');
const Doctor = require('../models/doctors.model');
const Hospital = require('../models/hospital.model');



const updateImage = async(collection, id, fileName) => {

  switch (collection) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found');
        return false;
      }

      const oldPath = `./uploads/doctors/${doctor.img}`;
      if (filesystem.existsSync(oldPath)) {
        // Delete old image path
        filesystem.unlinkSync(oldPath);
      }

      doctor.img = fileName;
      await doctor.save();
      return true;
      break;

    case 'hospitals':

      break;

    case 'users':

      break;
  
    default:
      break;
  }

}


module.exports = {
  updateImage
}