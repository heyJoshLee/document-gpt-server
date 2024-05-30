const QuestionSet = require('../models/QuestionSet');

// Get all question sets
const getAllQuestionSets = async (req, res) => {
  try {
    const questionSets = await QuestionSet.find();
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single question set by ID
const getQuestionSetById = async (req, res) => {
  try {
    const questionSet = await QuestionSet.findById(req.params.id);
    if (!questionSet) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    res.json(questionSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new question set
const createQuestionSet = async (req, res) => {
  try {
    const questionSet = new QuestionSet(req.body);
    await questionSet.save();
    res.status(201).json(questionSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing question set
const updateQuestionSet = async (req, res) => {
  try {
    const questionSet = await QuestionSet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!questionSet) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    res.json(questionSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a question set
const deleteQuestionSet = async (req, res) => {
  try {
    const questionSet = await QuestionSet.findByIdAndDelete(req.params.id);
    if (!questionSet) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    res.json({ message: 'Question set deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
};