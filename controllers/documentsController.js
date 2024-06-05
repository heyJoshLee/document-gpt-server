import Document from '../models/document.js';
import { chatGptRequestWithHtml } from '../services/chatGptService.js';
import { sendAdminEmailToReviewDocuments } from '../services/mailer.js';

// Get all
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single object
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create one new
export const createDocument = async (req, res) => {
  console.log('creating document with body', req.body)
  try {
    const document = new Document(req.body);
    await document.save();
    console.log('created document', document)
    res.status(201).json(document);
  } catch (error) {
    console.log('error creating document', error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Update one
export const updateDocumentById = async (req, res) => {
  console.log('updating document with body', req.body)
  console.log('updating document with id', req.params.id)
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    console.log('updated document', document)
    res.json(document);
  } catch (error) {
    console.log('error updating document', error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete one
export const deleteDocumentById = async (req, res) => {
  console.log('deleting document with id', req.params.id)
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    console.log('deleted document', document)
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.log('error deleting document', error)
    res.status(500).json({ error: 'Server error' });
  }
};

export const generateWithChatGpt = async (req, res) => {
  const documentId = req.params.id;
  const { prompt } = req.body;
  console.log('generating document with prompt', prompt)
  try {
    let document = await Document.findById(documentId);
    const returnedPrompt = await chatGptRequestWithHtml(prompt);
    document.body = returnedPrompt;
    document = await document.save();
    console.log('document generatd successfully', document)
    return res.status(200).json(document);
  } catch (error) {
    console.log('error generating document', error)
    res.status(500).json({ error: 'Server error' });
  }
}

export const testControllerFunction = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    console.log('Unauthorized. This is only available in development mode.');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const documents = await Document.find();
  const document = documents[0];
  console.log('testControllerFunction document', document);
  sendAdminEmailToReviewDocuments(documents);
  console.log('testControllerFunction email sent');
  return res.json({ message: 'testControllerFunction' });
}

export const userCreateDocument = async (req, res) => {
  console.log('user create document')
  console.log('creating document with body', req.body)
  return
  try {
    const document = new Document(req.body);
    await document.save();
    console.log('created document', document)
    res.status(201).json(document);
  } catch (error) {
    console.log('error creating document', error)
    res.status(500).json({ error: 'Server error' });
  }
}