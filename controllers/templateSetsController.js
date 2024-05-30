import TemplateSet from '../models/TemplateSet.js';
// Get all template sets
export const getAllTemplateSets = async (req, res) => {
  try {
    const templateSets = await TemplateSet.find();
    res.json(templateSets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single template set by ID
export const getTemplateSetById = async (req, res) => {
  try {
    const templateSet = await TemplateSet.findById(req.params.id);
    if (!templateSet) {
      return res.status(404).json({ error: 'Template set not found' });
    }
    res.json(templateSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new template set
export const createTemplateSet = async (req, res) => {
  try {
    const templateSet = new TemplateSet(req.body);
    await templateSet.save();
    res.status(201).json(templateSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a template set by ID
export const updateTemplateSet = async (req, res) => {
  try {
    const templateSet = await TemplateSet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!templateSet) {
      return res.status(404).json({ error: 'Template set not found' });
    }
    res.json(templateSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a template set by ID
export const deleteTemplateSet = async (req, res) => {
  try {
    const templateSet = await TemplateSet.findByIdAndDelete(req.params.id);
    if (!templateSet) {
      return res.status(404).json({ error: 'Template set not found' });
    }
    res.json({ message: 'Template set deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
