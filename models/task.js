const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
  },
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
