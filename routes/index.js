// Tasks routes
const { Router } = require('express');

const router = Router();

const { param, body } = require('express-validator');
const {
  getTasks,
  createTask,
  taskById,
  updateTask,
  deleteTask,
} = require('../controllers/task');

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the task name
 *        description:
 *          type: string
 *          description: task details
 *        completed:
 *          type: boolean
 *          description: true/false if the task is done
 *      required:
 *          - name
 *      example:
 *          name: Doctor appointment
 *          description: visit the doctor Monday 8:00 am
 *          completed: false
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *     summary: return all tasks
 *     tags: [Task]
 *     responses:
 *        200:
 *          description: all users
 *          content:
 *            application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                 $ref : '#/components/schemas/Task'
 */
router.get('/tasks', getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: return a task
 *      tags: [Task]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the task id
 *      responses:
 *             200:
 *              description: a task 
 *              content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref : '#/components/schemas/Task'
 *             400:
 *               description: bad request
 */
router.get(
  '/tasks/:id',
  param('id').isMongoId().withMessage('Invalid id').escape(),
  taskById,
  );

/**
 * @swagger
 * /tasks: 
 *  post:
 *    summary: Create a new task
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref : '#/components/schemas/Task'
 *      responses:
 *          200:
 *            description: new task created!
*/
router.post(
  '/tasks',
  body('name').notEmpty().withMessage('Name can not be null').escape(),
  body('completed')
    .default(false)
    .isBoolean()
    .withMessage('Completed must be a boolean')
    .escape(),
  body('description')
    .default('')
    .isString()
    .withMessage('Description should an string')
    .escape(),
  createTask,
);

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      summary: Update a task
 *      tags: [Task]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the task id
 *      requestBody:
 *         required: true
 *         content: 
 *             application/json:
 *                schema:
 *                  type: object
 *                  $ref : '#/components/schemas/Task'
 *      responses:
 *                 200:
 *                  description: task updated!
 *                 400:
 *                  description: bad request
 */
router.put(
  '/tasks/:id',
  param('id').isMongoId().withMessage('Invalid id').escape(),
  body('name').notEmpty().withMessage('Name can not be null').escape(),
  updateTask,
);

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      summary: delete a task
 *      tags: [Task]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the task id
 *      responses:
 *          200:
 *           description: task delted
 *          400:
 *           description: bad request
 */
router.delete(
  '/tasks/:id',
  param('id').isMongoId().withMessage('Invalid id').escape(),
  deleteTask,
);

module.exports = router;
