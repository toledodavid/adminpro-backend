const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('DataBase Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error starting DataBase, see logs');
  }

}

module.exports = {
  dbConnection
}
