import Submission from '../models/submission.js';
import { generateDocumentsFromSubmission, testGenerateDocumentsFromSubmission } from '../services/submissionService.js';
import { sendAdminEmailToReviewDocuments, sendCustomerEmailDocumentApproved } from '../services/mailer.js';
import User from '../models/user.js';
import Document from '../models/document.js';
// Get all
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single object
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Takes the submission, uses the corrosponding template set to generate documents for each template and sends and email
export const createSubmission = async (req, res) => {
  try {
    let submissionObject = {}
    if (process.env.NODE_ENV === 'development') {
      submissionObject = await testGenerateDocumentsFromSubmission(req.body)
    } else {
      submissionObject = await generateDocumentsFromSubmission(req.body)
    }

    if (submissionObject.documents.length > 0) {
      await sendAdminEmailToReviewDocuments(submissionObject.submission, submissionObject.documents);
      return res.status(201).json("Documents created successfully");
    } else {
      return res.status(201).json("No documents created");
    }

  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Update one
export const updateSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete one
export const deleteSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDocumentsForSubmission = async (req, res) => {
  try {
    const documents = await Document.find({ submissionId: req.params.id });
    if (!documents) {
      return res.status(404).json({ error: 'Documents not found' });
    }
    console.log('documents', documents)
    return res.json(documents);
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ error: 'Server error' });
  }
}

export const notifyUser = async (req, res) => {
  // try {
  //   const submissionId = req.params.id
  // TODO find user according to the submission
  //   const user = await User.findById(userId);
  //   if (!user) {
  //     console.log('User not found');
  //     return res.status(404).json({ error: 'User not found' });
  //   }
  //   await sendCustomerEmailDocumentApproved(user);
  //   console.log('User notified');
  //   return res.json({ message: 'User notified' });
  // } catch (error) {
  //   console.log('error', error)
  //   return res.status(500).json({ error: 'Server error' });
  // }
}