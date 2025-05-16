import express from 'express';
import Skill from '../models/Skill.js';
import { validateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const { limit, category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    let skillsQuery = Skill.find(query);
    
    if (limit) {
      skillsQuery = skillsQuery.limit(parseInt(limit));
    }
    
    const skills = await skillsQuery.sort({ category: 1, proficiency: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category })
      .sort({ proficiency: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new skill (admin only)
router.post('/', validateAdmin, async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a skill (admin only)
router.put('/:id', validateAdmin, async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a skill (admin only)
router.delete('/:id', validateAdmin, async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;