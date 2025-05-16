import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validateAdmin } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';

dotenv.config();
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // In a real application, admins would be stored in the database
    // For this example, we'll use environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (username !== adminUsername) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, passwords would be hashed
    // For simplicity in this demo, we're comparing plaintext
    const isMatch = password === adminPassword;
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      token,
      expiresIn: 86400 // 24 hours in seconds
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate token
router.get('/validate-token', validateAdmin, (req, res) => {
  res.status(200).json({ valid: true });
});

// Get admin dashboard stats
router.get('/stats', validateAdmin, async (req, res) => {
  try {
    const [projectCount, skillCount, messageCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments()
    ]);
    
    const unreadMessageCount = await Message.countDocuments({ read: false });
    
    res.status(200).json({
      projectCount,
      skillCount,
      messageCount,
      unreadMessageCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;