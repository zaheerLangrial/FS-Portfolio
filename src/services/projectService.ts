import { Project } from '../types/Project';

// Mock data for initial development
const MOCK_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Hospital Services',
    description: 'A comprehensive React application for managing hospital services, featuring responsive design and advanced state management.',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Redux Toolkit', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/example',
    liveUrl: 'https://demo.example.com',
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
    githubUrl: 'https://github.com/example/',
    featured: true
  },
  {
    _id: '4',
    title: 'E-commerce Dashboard',
    description: 'Administrative dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing.',
    image: 'https://images.pexels.com/photos/7620620/pexels-photo-7620620.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Chart.js', 'Material UI', 'Firebase'],
    githubUrl: 'https://github.com/example/ecommerce-dashboard',
    liveUrl: 'https://dashboard-demo.example.com',
    featured: false
  },
  {
    _id: '5',
    title: 'OMS',
    description: "Worked on Enimagtix's in-house OMS (Office Management System) product built with React and MobX. Primarily focused on bug fixing and later contributed to the micro-frontend-based new version by implementing a permission feature.",
    image: 'https://images.pexels.com/photos/7438104/pexels-photo-7438104.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Chart.js', 'Material UI', 'Firebase'],
    githubUrl: 'https://github.com/example/',
    liveUrl: 'https://dashboard-demo.example.com',
    featured: false
  },
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