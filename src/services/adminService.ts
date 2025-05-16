import api from './api';
import { getProjects } from './projectService';
import { getSkills } from './skillService';
import { getMessages } from './messageService';

// Get admin dashboard stats
export const getAdminStats = async () => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.get('/admin/stats');
    // return response.data;
    
    // For development, fetch data from other services
    const [projects, skills, messages] = await Promise.all([
      getProjects(),
      getSkills(),
      getMessages()
    ]);
    
    return {
      projectCount: projects.length,
      skillCount: skills.length,
      messageCount: messages.length
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      projectCount: 0,
      skillCount: 0,
      messageCount: 0
    };
  }
};