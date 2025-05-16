import api from './api';
import { Project } from '../types/Project';

// Mock data for initial development
const MOCK_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Hospital Services',
    description: 'A comprehensive React application for managing hospital services, featuring responsive design and advanced state management.',
    image: 'data:image/jpeg;base64,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',
    technologies: ['React', 'Redux Toolkit', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/example/palmera',
    liveUrl: 'https://palmera-demo.example.com',
    featured: true
  },
  {
    _id: '2',
    title: 'Boxing Website',
    description: 'Next.js website for a boxing organization with dynamic content management, responsive design, and SEO optimization.',
    image: 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'CSS Modules', 'Vercel', 'TypeScript'],
    githubUrl: 'https://github.com/example/boxing-website',
    liveUrl: 'https://boxing-demo.example.com',
    featured: true
  },
  {
    _id: '3',
    title: 'B2B',
    description: 'Contributed to B2b by developing frontend components, integrating APIs, and implementing parsers for data processing.',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/example/axya-components',
    featured: true
  },
  {
    _id: '4',
    title: 'E-commerce Dashboard',
    description: 'Administrative dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing.',
    image: 'https://images.pexels.com/photos/230566/pexels-photo-230566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Chart.js', 'Material UI', 'Firebase'],
    githubUrl: 'https://github.com/example/ecommerce-dashboard',
    liveUrl: 'https://dashboard-demo.example.com',
    featured: false
  }
];

// Get all projects or a limited number
export const getProjects = async (limit?: number): Promise<Project[]> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.get(`/projects${limit ? `?limit=${limit}` : ''}`);
    // return response.data;
    
    // Mock data
    return limit ? MOCK_PROJECTS.slice(0, limit) : MOCK_PROJECTS;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Get a single project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.get(`/projects/${id}`);
    // return response.data;
    
    // Mock data
    const project = MOCK_PROJECTS.find(p => p._id === id);
    return project || null;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
};

// Create a new project
export const createProject = async (project: Omit<Project, '_id'>): Promise<Project> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.post('/projects', project);
    // return response.data;
    
    // Mock data
    const newProject = {
      ...project,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_PROJECTS.push(newProject);
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // const response = await api.put(`/projects/${id}`, updates);
    // return response.data;
    
    // Mock data
    const index = MOCK_PROJECTS.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    
    const updatedProject = {
      ...MOCK_PROJECTS[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    MOCK_PROJECTS[index] = updatedProject;
    return updatedProject;
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    // Actual API call (uncomment when backend is ready)
    // await api.delete(`/projects/${id}`);
    
    // Mock data
    const index = MOCK_PROJECTS.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Project not found');
    
    MOCK_PROJECTS.splice(index, 1);
    return true;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};