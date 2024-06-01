import TemplateSet from '../models/templateSet.js';
import TemplateModel from '../models/template.js';
// Get all
export const getAllTemplateSets = async (req, res) => {
  try {
    const templateSets = await TemplateSet.find();
    res.json(templateSets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single object
export const getTemplateSetById = async (req, res) => {
  try {
    const templateSet = await TemplateSet.findById(req.params.id);
    if (!templateSet) {
      return res.status(404).json({ error: 'TemplateSet not found' });
    }
    res.json(templateSet);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create one new
export const createTemplateSet = async (req, res) => {
  console.log('createing template set with the params:', req.body)
  try {
    const templateSet = new TemplateSet(req.body);
    await templateSet.save();
    console.log('template set created:', templateSet)
    res.status(201).json(templateSet);
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Update one
export const updateTemplateSetById = async (req, res) => {
  console.log('params:', req.params)
  const { id } = req.params;

  console.log("id", id)
  const arrayOfValues = req.body;
  let templateSetParams = {};
  arrayOfValues.forEach((value) => {
    templateSetParams[value.name] = value.value;
  });
  console.log("templateSetParams", templateSetParams)

  try {
    const templateSet = await TemplateSet.findByIdAndUpdate(req.params.id, templateSetParams, {
      new: true,
    });
    if (!templateSet) {
      return res.status(404).json({ error: 'TemplateSet not found' });
    }
    console.log('template set updated:', templateSet)
    res.json(templateSet);
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete one
export const deleteTemplateSetById = async (req, res) => {
  try {
    const templateSet = await TemplateSet.findByIdAndDelete(req.params.id);
    if (!templateSet) {
      return res.status(404).json({ error: 'TemplateSet not found' });
    }
    res.json({ message: 'TemplateSet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get templates for a template set
export const getTemplatesForTemplateSetWithId = async (req, res) => {
  console.log('getting templates for template set with id:', req.params.id)
  try {
    const templates = await TemplateModel.find({ templateSetId: req.params.id });
    console.log('templates:', templates)
    res.json(templates);
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ error: 'Server error' });
  }
};
