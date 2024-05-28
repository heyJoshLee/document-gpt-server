import Document from '../models/document.js';

// const User = require('../models/user');


// GET DOCUMENTS

export const getDocuments = async (req, res) => {
  try {
    // Get the user ID from the request
    //const userId = req.user.id;
    const userId = 1;
    // Get all documents from the database
    const documents = await Document.find({ userId });
    return res.status(201).json(documents);

  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: 'Server error' });
  }
}

// READ DOCUMENT
export const getDocument = async (req, res) => {

  try {
    // Get the user ID from the request
    //const userId = req.user.id;
    const userId = 1;
    // Get the document from the database
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if the user is an admin or the owner of the document
    if (!document.userId.equals(userId) && !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Return the document
    return res.json(document);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: 'Server error' });
  }
};

// CREATE DOCUMENT
export const createDocument = async (req, res) => {

  const documentParams = req.body;
  console.log("documentParams", documentParams);
  try {
    // Get the user ID from the token
    //const userId = req.user.id;

    // Check if the user is an admin
    // const user = await User.findById(userId);
    // if (!user.isAdmin) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // // Create a new document
    const document = new Document(documentParams);

    // Set the user ID as the document's owner
    // document.userId = userId;
    document.userId = 1;
    // Save the document to the database
    await document.save();

    // Return the created document
    return res.status(201).json(document);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: error.message });
  }
};

// DELETE DOCUMENT
export const updateDocument = async (req, res) => {
  const documentId = req.params.id;
  try {
    // Get the user ID from the request
    // const userId = req.user.id;

    // Check if the user is an admin or the owner of the document
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    if (!document.userId.equals(userId) && !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the document with the new data
    document.title = req.body.title;
    document.content = req.body.content;

    // Save the updated document to the database
    await document.save();

    // Return the updated document
    return res.json(document);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: 'Server error' });
  }
};

// EDIT DOCUMENT
export const deleteDocument = async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.user.id;

    // Check if the user is an admin or the owner of the document
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    if (!document.userId.equals(userId) && !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the document from the database
    await document.remove();

    // Return a success message
    return res.json({ message: 'Document deleted' });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: 'Server error' });
  }
};

