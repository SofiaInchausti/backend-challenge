const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://sofia:sofiia35774344@cluster0.nrjq4jc.mongodb.net/tasksDatabase';

const conecctionPArams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, conecctionPArams)
  .then(() => {
    console.log('Connect to the DB');
  })
  .catch((e) => {
    console.log('Error:', e);
  });
