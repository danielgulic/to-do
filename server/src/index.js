const express = require('express');
const cors = require('cors');
const rethinkdbdash = require('rethinkdbdash');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const r = module.exports.r = rethinkdbdash({ db: 'todocloud' });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./routes/tasks.js'));

app.listen(port, () => console.log('Listening on ' + port));