const express = require('express');
const router = express.Router();

const { conversionPostValidation, conversionValidation, validate } = require('../validator.js')

const conversionsController =require('../controllers/conversions');


router.get('/', conversionsController.getAllConversions);
router.get('/:id', conversionsController.getSingleConversion);
router.post(
    '/', 
    conversionPostValidation(),
    validate, 
    conversionsController.createConversion);
router.put(
    '/:id', 
    conversionValidation(),
    validate,
    conversionsController.updateConversion);
router.delete('/:id', conversionsController.deleteConversion);

module.exports = router;