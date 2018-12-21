const express = require('express');
const router = express.Router();
const r = require('../index.js').r;
const sanitize = require('sanitize-html');

router.get('/', async (req, res) => {
  if (!req.query.id) return res.status(400).json({ error: 'No user ID provided' });
  const tasks = await r.table('tasks').filter({ createdBy: req.query.id }).run();
  return res.json({ tasks });
});

router.post('/', async (req, res) => {
  if (!req.query.id) return res.status(400).json({ error: 'No user ID provided' });
  if (req.query.id.length < 10) return res.status(400).json({ error: 'User IDs must be atleast 10 characters long' });
  if (!req.body.name) return res.status(400).json({ error: 'Missing "name" property' });
  if (req.body.name.length < 1 || req.body.name.length > 45) return res.status(400).json({ error: 'Task name must be 1-45 characters long'});
  const tasks = await r.table('tasks').filter({ createdBy: req.query.id }).run();
  if (tasks.length > 50) return res.status(418).json({ error: 'There is a limit of 50 concurrent tasks per user' });
  await r.table('tasks').insert({
    createdBy: req.query.id,
    name: sanitize(req.body.name, {
      allowedTags: [],
      allowedAttributes: {}
    }),
    createdAt: Date.now()
  }).run();
  res.json({ tasks: await r.table('tasks').filter({ createdBy: req.query.id }).run() });
});

module.exports = router;