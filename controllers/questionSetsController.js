import QuestionSet from '../models/QuestionSet.js';
import Question from '../models/Question.js';
// Get all question sets
export const getAllQuestionSets = async (req, res) => {
  try {
    const questionSets = await QuestionSet.find();
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single question set by ID
export const getQuestionSetById = async (req, res) => {
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
export const createQuestionSet = async (req, res) => {
  try {
    const questionSet = new QuestionSet(req.body);
    await questionSet.save();
    res.status(201).json(questionSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing question set
export const updateQuestionSet = async (req, res) => {
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
export const deleteQuestionSet = async (req, res) => {
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


export const getQuestionsForQuestionSet = async (req, res) => {
  console.log("getting questions for question set", req.params.id)
  try {
    const questions = await Question.find({ questionSetId: req.params.id });
    if (!questions) {
      console.log("questions not found")
      return res.status(404).json({ error: 'Questionsnot found' });
    }
    console.log("questions found: ", questions)
    return res.json(questions);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}