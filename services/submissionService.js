import { chatGptRequestWithHtml } from './chatGptService.js';
import Document from '../models/document.js';
import QuestionSet from '../models/questionSet.js';
import TemplateSet from '../models/templateSet.js';
import Template from '../models/template.js';
import Submission from '../models/submission.js';
import User from '../models/user.js';


// Takes all the questions and answers from the submission and formats them for ChatGPT
const genereateQuestionAndAnswerInformationFromSubmissionObject = (submission) => {
  let questionAndAnswerInformation = '';
  for (const answer in submission) {
    if (answer === 'email' || answer == 'questionSetId' || answer == 'user') {
      continue;
    }
    questionAndAnswerInformation += `<h3>${answer}</h3> <p>${submission[answer]}</p>`
  }
  return questionAndAnswerInformation;
}

export const generateDocumentsFromSubmission = async (submission) => {
  const templateSet = await TemplateSet.findOne({ questionSetId: submission.questionSetId });
  const questionSet = await QuestionSet.findById(submission.questionSetId);
  const questions = await Question.find({ questionSetId: questionSet._id });
  const templates = await Template.find({ templateSetId: templateSet._id });
  const newSubmission = await Submission.create(submission);

  let finalDocuments = [];
  for (const template of templates) {
    let documentParams = {
      title: template.documentTitle,
      templateId: template._id,
      userEmail: submission?.email,
      submissionId: newSubmission._id
    }

    const questionAndAnswerInformation = genereateQuestionAndAnswerInformationFromSubmissionObject(submission)

    const newBody = await chatGptRequestWithHtml(`Use the following information for the prompt: ${questionAndAnswerInformation}. PROMPT${template.prompt}`);
    documentParams.body = newBody;
    const document = await Document.create(documentParams);

    console.log('document', document)
    finalDocuments.push(document);
  }
  console.log('finalDocuments', finalDocuments)
  return { documents: finalDocuments, submission: newSubmission }
}

// Does not hit chatGPT API, just generates documents with the same prompt
export const testGenerateDocumentsFromSubmission = async (submission) => {
  // Creates a user if not provided

  const user = submission.user || User.create({ email: submission?.email });
  const templateSet = await TemplateSet.findOne({ questionSetId: submission.questionSetId });
  const questionSet = await QuestionSet.findById(submission.questionSetId);
  const templates = await Template.find({ templateSetId: templateSet._id });
  const newSubmission = await Submission.create(submission);
  let finalDocuments = [];
  for (const template of templates) {
    let documentParams = {
      title: template.documentTitle,
      templateId: template._id,
      userEmail: submission?.email,
      submissionId: newSubmission._id,
      userId: user._id,
      body: '<h1>Test document</h1> <p>This is a test  document</p>'
    }

    // This isn't used in dev since the ChatGPT API isn't being hit.
    const questionAndAnswerInformation = genereateQuestionAndAnswerInformationFromSubmissionObject(submission)
    const document = await Document.create(documentParams);
    console.log('pusing document with ._id', document._id)
    finalDocuments.push(document);
  }
  console.log('finalDocuments.length', finalDocuments.length)

  return { documents: finalDocuments, submission: newSubmission }
}
