const { body, validationResult } = require('express-validator')
const mongodb = require('./db/connection')

unitsArray = ['cup', 'tsp', 'tbsp', 'slices', 'whole'] //array of acceptable units. Going to eventually pull this from the DB

const postValidationRules = () => {
    return [
        body('name') // start validate recipe name
            .custom(async value => { //start a custom validator
                const query = { name: value } //create a query to search for the recipe name entered in the POST request
                const existingName = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION).findOne(query); //search for the same name in the collection
                if (existingName) { //if we find that name
                    throw new Error('A recipe with this name already exists'); //throw a custom error
                }
            })
        ]
}
const validationRules = () => {
  return [
    body('name').notEmpty(), // recipe name must not be empty
    body('**.name').notEmpty(), //make sure the ingredient names aren't empty
    body('**.amount') // start validate the ingredient amounts
        .toFloat() // convert amounts from string to float; "2" => 2
        .custom(async value => {
            if (typeof(value) != 'number' || isNaN(value)) { //if it's NaN or not a number
                throw new Error('The amount must be an integer or decimal') //throw an error
            }
            
        }),
    body('**.unit') // begin validate the ingredient units
        .custom(async value => {
            if (!(unitsArray.includes(value))) { //check if unit is part of enumeration in unitsArray
                throw new Error(`Unit '${value}' is not one of: ${unitsArray.join(', ')}`); //if not, throw an error
            }
        })
        
  ]
}

const conversionValidation = () => {
  return [
    body('title').notEmpty(),
    body('**.name').notEmpty(),
    body('**.amount')
      .toFloat()
      .custom(async value => {
        if (typeof(value) != 'number' || isNaN(value)) { //if it's NaN or not a number
            throw new Error('The amount must be an integer or decimal') //throw an error
        }
    })
  ]
}

const conversionPostValidation = () => {
  return [
    body('title') // start validate conversion title
        .custom(async value => { //start a custom validator
            const query = { title: value } //create a query to search for the recipe title entered in the POST request
            const existingName = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION2).findOne(query); //search for the same title in the collection
            if (existingName) { //if we find that title
                throw new Error('A conversion with this title already exists'); //throw a custom error
            }
        })
    ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  postValidationRules,
  validationRules,
  validate,
  conversionValidation,
  conversionPostValidation
}