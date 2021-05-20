const router = require('express').Router();
const romanConverter = require('./controllers/romanConverter');

router.get('/', (req,res) => {
    res.status(200);
    res.send('Hello Jacob');
})
router.post('/romanConverter', romanConverter.convert);

module.exports = router;