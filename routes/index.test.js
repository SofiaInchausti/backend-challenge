const request = require('supertest');
const server = require('../index');

describe('Get all tasks', () => {
  it('should get all tasks', async () => {
    await request(server)
      .get('/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Get task by id', () => {
  it('should get id task', async () => {
    await request(server)
      .get('/tasks/6441cc55389feba0ea0334c3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  it('should answer bad request if the id param is not from mogoDB', async () => {
    await request(server)
      .get('/tasks/aaa')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });
  it('should answer bad request if the id param is numeric', async () => {
    await request(server)
      .get('/tasks/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

describe('Create Task', () => {
  const newTask = {
    name: 'Do exercise',
  };
  const resultTask = {
    name: 'Do exercise',
    description: '',
    completed: false,
  };
  it("should create a task and added to task array. Task properties: name, description (optional), completed (optional, by default it's value is false)", async () => {
    const response = await request(server).post('/tasks').send(newTask);
    const lastItem = response.body.tasks[response.body.tasks.length - 1];
    expect(response.statusCode).toBe(200);
    expect(lastItem.name).toBe(newTask.name);
  });
  it('should crated a task with property name as required', async () => {
    const response = await request(server).post('/tasks').send(newTask);
    const lastItem = response.body.tasks[response.body.tasks.length - 1];
    expect(response.statusCode).toBe(200);
    expect(lastItem.name).toBe(resultTask.name);
    expect(lastItem.completed).toBe(resultTask.completed);
    expect(lastItem.description).toBe(resultTask.description);
  });

  describe('Update Task', () => {
    const updateTask = {
      _id: '6443c6216693f76930162820',
      name: 'Do exercise',
      description: 'Run during 45min',
      completed: true,
      __v: 0,
    };
    it('should update task if it exists', async () => {
      const response = await request(server)
        .put('/tasks/6443c6216693f76930162820')
        .send(updateTask);
      expect(response.statusCode).toBe(200);
      expect(response.body.taskUpdated).toStrictEqual(updateTask);
    });
    it('should answer `No task with this ID: ($idNumber)` if the task not existed', async () => {
      const response = await request(server)
        .put('/tasks/6443c6216693f76930162828')
        .send(updateTask);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        'No task with this ID: 6443c6216693f76930162828',
      );
    });
  });

  describe('Delete Task', () => {
    it('should delete a task from the task array', async () => {
      const id = '64428ca3fad6b7ae15c21cef';
      const response = await request(server).delete(`/tasks/${id}`);
      const exists = response.body.tasks.find((task) => {
        id == task._id;
      });
      expect(response.statusCode).toBe(200);
      expect(exists).toBe(undefined);
    });
    it('should answer `No task with this ID: ($idNumber)` if the task not existed', async () => {
      const response = await request(server).delete(
        '/tasks/6443c6216693f76930162828',
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        'No task with this ID: 6443c6216693f76930162828',
      );
    });
  });
});
