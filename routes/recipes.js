const express = require('express');
const router = express.Router();

const { validationRules, validate, postValidationRules } = require('../validator.js')

const recipesController = require('../controllers/recipes');


router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getSingleRecipe);
router.post(
    '/', 
    postValidationRules(),
    validationRules(), 
    validate, 
    recipesController.createRecipe);
router.put(
    '/:id', 
    validationRules(),
    validate,
    recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;