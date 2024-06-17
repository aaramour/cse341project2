const express = require('express');
const router = express.Router();

router.use('/', require('./swagger')); 
router.use('/recipes', require('./recipes'));
router.use('/conversions', require('./conversions'));


module.exports = router;