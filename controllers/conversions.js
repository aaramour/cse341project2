const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;


const getAllConversions = async (req, res) => {
  try {
    const result = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION2).find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleConversion = async (req, res) => {
  try {
    const conversionId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION2)
      .find({ _id: conversionId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createConversion = async (req, res) => {
  try {
    const conversion = {
      title: req.body.title,
      equivalents: req.body.equivalents
    };
    
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION2).insertOne(conversion);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the conversion.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateConversion = async (req, res) => {
  try {
    const conversionId = new ObjectId(req.params.id);
    const conversion = {
      title: req.body.title,
      equivalents: req.body.equivalents
    };

    const response = await mongodb
      .getDb()
      .db(process.env.DB_NAME)
      .collection(process.env.COLLECTION2)
      .replaceOne({ _id: conversionId }, conversion);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the conversion.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteConversion = async (req, res) => {
  try {
    const conversionId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db(process.env.DB_NAME).collection(process.env.COLLECTION2).deleteOne({ _id: conversionId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the conversion.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllConversions, getSingleConversion, createConversion, updateConversion, deleteConversion };