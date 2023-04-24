const { validationResult } = require('express-validator');
const Task = require('../models/task');

async function getTasks(_req, res) {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.sendStatus(400);
  }
}

async function taskById(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const { id } = req.params;
    const task = await Task.findById(id);
    const data = task || `No task with this ID: ${id}`;
    res.status(200).json(data);
  } else {
    res.status(400).send({ errors: result.array() });
  }
}

async function createTask(req, res) {
  const result = validationResult(req);
  const { name, description, completed } = req.body;
  if (result.isEmpty()) {
    const taskModel = new Task();
    taskModel.name = name;
    taskModel.description = description;
    taskModel.completed = completed || false;
    await taskModel.save();
    const data = await Task.find();
    res.status(200).json({ message: 'Inserted in DB', tasks: data });
  } else {
    res.status(400).send({ errors: result.array() });
  }
}

async function updateTask(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id } = req.params;
      const { body } = req;
      const task = await Task.findByIdAndUpdate(id, body);
      const data = task ? 'Updated' : `No task with this ID: ${id}`;
      res.status(200).json({ message: data, taskUpdated: task});
    } else {
      res.status(400).send({ errors: result.array() });
    }
  } catch (err) {
    res.send(400);
  }
}

async function deleteTask(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete({ _id: id });
      const message = task ? 'Deleted' : `No task with this ID: ${id}`;
      const data = await Task.find();
      res.status(200).json({ message, tasks: data });
    } else {
      res.status(400).send({ errors: result.array() });
    }
  } catch (err) {
    res.send(400);
  }
}
module.exports = {
  getTasks, taskById, createTask, updateTask, deleteTask,
};
