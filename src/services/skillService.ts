import api from './api';
import { Skill } from '../types/Skill';

// Mock data for initial development
const MOCK_SKILLS: Skill[] = [
  {
    _id: '1',
    name: 'React',
    proficiency: 90,
    category: 'Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    _id: '2',
    name: 'Next.js',
    proficiency: 85,
    category: 'Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  {
    _id: '3',
    name: 'TypeScript',
    proficiency: 80,
    category: 'Language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    _id: '4',
    name: 'TailwindCSS',
    proficiency: 90,
    category: 'Frontend',
    icon: 'data:image/png;base64,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'
  },
  {
    _id: '5',
    name: 'Node.js',
    proficiency: 75,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    _id: '6',
    name: 'Express',
    proficiency: 75,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
  },
  {
    _id: '7',
    name: 'MongoDB',
    proficiency: 70,
    category: 'Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  {
    _id: '8',
    name: 'Django',
    proficiency: 76,
    category: 'Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'
  },
  {
    _id: '9',
    name: 'Redux',
    proficiency: 80,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg'
  },
  {
    _id: '10',
    name: 'Git',
    proficiency: 85,
    category: 'Tool',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    _id: '11',
    name: 'JavaScript',
    proficiency: 92,
    category: 'Language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    _id: '12',
    name: 'AntD',
    proficiency: 80,
    category: 'Frontend',
    icon: 'data:image/jpeg;base64,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'
  },
  {
    _id: '13',
    name: 'Python',
    proficiency: 65,
    category: 'Language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  }
];

// Get all skills or a limited number
export const getSkills = async (limit?: number): Promise<Skill[]> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.get(`/skills${limit ? `?limit=${limit}` : ''}`);
    // return response.data;
    
    // Mock data
    return limit ? MOCK_SKILLS.slice(0, limit) : MOCK_SKILLS;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

// Get skills by category
export const getSkillsByCategory = async (category: string): Promise<Skill[]> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.get(`/skills/category/${category}`);
    // return response.data;
    
    // Mock data
    return MOCK_SKILLS.filter(skill => skill.category === category);
  } catch (error) {
    console.error(`Error fetching skills for category ${category}:`, error);
    return [];
  }
};

// Create a new skill
export const createSkill = async (skill: Omit<Skill, '_id'>): Promise<Skill> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.post('/skills', skill);
    // return response.data;
    
    // Mock data
    const newSkill = {
      ...skill,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_SKILLS.push(newSkill);
    return newSkill;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
};

// Update an existing skill
export const updateSkill = async (id: string, updates: Partial<Skill>): Promise<Skill> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.put(`/skills/${id}`, updates);
    // return response.data;
    
    // Mock data
    const index = MOCK_SKILLS.findIndex(s => s._id === id);
    if (index === -1) throw new Error('Skill not found');
    
    const updatedSkill = {
      ...MOCK_SKILLS[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    MOCK_SKILLS[index] = updatedSkill;
    return updatedSkill;
  } catch (error) {
    console.error(`Error updating skill ${id}:`, error);
    throw error;
  }
};

// Delete a skill
export const deleteSkill = async (id: string): Promise<boolean> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // await api.delete(`/skills/${id}`);
    
    // Mock data
    const index = MOCK_SKILLS.findIndex(s => s._id === id);
    if (index === -1) throw new Error('Skill not found');
    
    MOCK_SKILLS.splice(index, 1);
    return true;
  } catch (error) {
    console.error(`Error deleting skill ${id}:`, error);
    throw error;
  }
};