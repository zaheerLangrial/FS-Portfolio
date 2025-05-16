import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validateAdmin = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }
    
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, access denied' });
    }
    
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, access denied' });
  }
};