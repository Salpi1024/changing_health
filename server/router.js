const router = require('express').Router();
const romanConverter = require('./controllers/romanConverter');

router.post('/romanConverter', romanConverter.convert);

module.exports = router;