const express = require('express');
const router = express.Router();
const r = require('../index.js').r;
const sanitize = require('sanitize-html');
const { filterUnexpectedData, handleJoi } = require('../util.js');
const newTaskSchema = require('../schemas/newTask.js');
const editTaskSchema = require('../schemas/editTask.js');

router.get('/', async (req, res) => {
  if (!req.query.userId) return res.status(400).json({ error: 'Missing user ID' });
  if (req.query.userId.length !== 36) return res.status(400).json({ error: 'Invalid user ID' });
  const tasks = await r.table('tasks').filter({ createdBy: req.query.userId }).run();
  return res.json({ tasks });
});

router.post('/', async (req, res) => {
  if (!req.query.userId) return res.status(400).json({ error: 'Missing user ID' });
  if (req.query.userId.length !== 36) return res.status(400).json({ error: 'Invalid user ID' });
  const tasks = await r.table('tasks').filter({ createdBy: req.query.userId }).run();
  if (tasks.length > 100) return res.status(418).json({ error: 'Limit of 100 concurrent tasks per user' });
  if (!handleJoi(req, res, newTaskSchema)) return;
  const insert = await r.table('tasks').insert({
    createdBy: req.query.userId,
    done: false,
    name: sanitize(req.body.name, {
      allowedTags: [],
      allowedAttributes: {}
    }),
    createdAt: Date.now()
  }).run();
  res.json({ task: await r.table('tasks').get(insert.generated_keys[0]).run() });
});

router.patch('/:taskId', async (req, res) => {
  if (!req.query.userId) return res.status(400).json({ error: 'Missing user ID' });
  if (req.query.userId.length !== 36) return res.status(400).json({ error: 'Invalid user ID' });
  if (req.params.taskId.length !== 36) return res.status(400).json({ error: 'Invalid task ID' });
  const task = await r.table('tasks').get(req.params.taskId).run();
  if (!task) return res.status(404).json({ error: 'Unknown task' });
  if (req.query.userId !== task.createdBy) return res.status(403).json({ error: 'Incorrect user ID' });
  if (!handleJoi(req, res, editTaskSchema)) return;
  await r.table('tasks').get(req.params.taskId).update(filterUnexpectedData(req.body, {}, editTaskSchema)).run();
  res.json({ task: await r.table('tasks').get(req.params.taskId).run() });

});

module.exports = router;