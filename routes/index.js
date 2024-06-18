const express = require('express');
const { getAllRecipes } = require('../controllers/recipes');
const router = express.Router();
const swaggerAutogen = require('swagger-autogen')();

router.use('/', require('./swagger')); 
router.use('/recipes', require('./recipes')
    /* 
        #swagger.tags = ['recipes']
    */
    );
router.use('/conversions', require('./conversions') 
     //   #swagger.tags = ['conversions']  
);


module.exports = router;