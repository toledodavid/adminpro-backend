const path = require('path');
const filesystem = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const uploadFile = (request, res = response) => {

  const collection = request.params.collection;
  const id = request.params.id;

  // Validate collection
  const validCollections = ['doctors', 'hospitals', 'users'];

  if (!validCollections.includes(collection)) {
    return res.json({
      ok: false,
      message: 'Invalid collection'
    });
  }

  // Validate exist file
  if (!request.files || Object.keys(request.files).length === 0) {
    return res.status(400).json({
      ok: false,
      message: 'No files were uploaded.'
    });
  }

  // Process image
  const file = request.files.image;
  const nameByParts = file.name.split('.');
  const fileExtension = nameByParts[nameByParts.length - 1];

  // Validate extension file
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExtensions.includes(fileExtension)) {
    return res.json({
      ok: false,
      message: 'Invalid extension file'
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Path to save image
  const path = `./uploads/${collection}/${fileName}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: 'Error moving image'
      });
    }


    // Update DataBase
    updateImage(collection, id, fileName);

    res.json({
      ok: true,
      message: 'File uploaded',
      fileName
    });

  });
  
}

const returnImage = (request, res = response) => {
  const { collection, image } = request.params;
  const pathImg = path.join(__dirname, `../uploads/${collection}/${image}`);

  // Default image
  if (filesystem.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }

}


module.exports = {
  uploadFile,
  returnImage
}