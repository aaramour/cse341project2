const express = require('express');
const router = express.Router();
// const clientID = process.env.CLIENT_ID;

router.use('/', require('./swagger')); 
// router.get('/', function(req, res) {
//     res.render('./pages/index',{client_id: clientID});
//   })
router.use('/recipes', require('./recipes'));
router.use('/conversions', require('./conversions'));
// router.use('/auth', (req, res) => {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`)
// });


module.exports = router;