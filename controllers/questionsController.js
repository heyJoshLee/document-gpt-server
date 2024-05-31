import Question from '../models/Question.js';
// Get all questions
export const getAllQuestions = async (req, res) => {
  console.log("getting all questions for the following request", req.body)
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestionsByQuestionSetId = async (req, res) => {
  try {
    const questions = await Question.find({
      questionSetId: req.params.id
    });
    if (!questions) {
      return res.status(404).json({ error: 'Questions not found' });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  console.log("creating question with the following info", req.body)
  try {
    const question = new Question(req.body);
    await question.save();
    console.log("question created", question)
    res.status(201).json(question);
  } catch (error) {
    console.log("error creating question", error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {

  const { id } = req.params;
  console.log("id", id)
  const arrayOfValues = req.body;
  let questionParams = {};
  arrayOfValues.forEach((value) => {
    questionParams[value.name] = value.value;
  });
  console.log("questionParams", questionParams)

  try {
    const question = await Question.findByIdAndUpdate(id, questionParams, {
      new: true,
    });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
