const Joi = require('joi');

exports.filterUnexpectedData = (subject, addition, schema) => {
  const data = Object.assign({}, addition);
  Object.keys(schema.describe().children).forEach(key => {
    data[key] = subject[key];
  });
  return data;
}

exports.handleJoi = (req, res, schema) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    if (!result.error.isJoi) {
      console.error(`Error while running Joi at ${Date.now()}: ${result.error}`);
      res.status(500).json({ error: 'Internal server error' })
      return false;
    }
    res.status(400).json({ error: result.error.details.map(item => item.message).join(', ') });
    return false;
  } else return true;
}
