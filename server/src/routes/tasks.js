const express = require('express');
const router = express.Router();
const r = require('../index.js').r;

router.get('/', async (req, res) => {
  if (!req.query.id) return res.status(400).json({ error: 'No ID provided' });
  const tasks = await r.table('tasks').filter({ createdBy: req.query.id }).run();
  return res.json({ tasks });
});

module.exports = router;