import Document from '../models/document.js';
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
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete one
export const deleteDocumentById = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
