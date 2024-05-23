const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;


const getAllRecipes = async (req, res) => {
  try {
    const result = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION).find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION)
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION).insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const recipe = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION)
      .replaceOne({ _id: userId }, recipe);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION).deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the recipe.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe };