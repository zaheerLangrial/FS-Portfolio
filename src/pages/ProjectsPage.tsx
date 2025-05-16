import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/projectService';
import { Project } from '../types/Project';
import { Select, Spin } from 'antd';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract unique categories from projects
        const uniqueTechnologies = Array.from(
          new Set(data.flatMap(project => project.technologies))
        );
        setCategories(['all', ...uniqueTechnologies]);
        
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    
    if (value === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.technologies.includes(value)
      );
      setFilteredProjects(filtered);
    }
  };

  // Show placeholder data while loading
  const placeholderProjects: Project[] = [
    {
      _id: '1',
      title: 'Loading...',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Loading...'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    },
    {
      _id: '2',
      title: 'Loading...',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Loading...'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    },
    {
      _id: '3',
      title: 'Loading...',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Loading...'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <SectionHeading 
          title="My Projects" 
          subtitle="Explore my latest work and contributions to various projects."
          align="center"
        />
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-text-secondary">
            Displaying {loading ? '...' : filteredProjects.length} projects
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
          
          <Select
            placeholder="Filter by technology"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: 200 }}
            options={categories.map(cat => ({ 
              value: cat, 
              label: cat === 'all' ? 'All Projects' : cat 
            }))}
            className="min-w-[200px]"
          />
        </div>
        
        {loading ? (
          <div className="py-12 flex justify-center">
            <Spin size="large" />
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-text-secondary text-lg">
              No projects found with the selected technology. Try another filter.
            </p>
          </motion.div>
        )}
        
        {/* Placeholder projects while loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderProjects.map((project, index) => (
              <div key={index} className="bg-background-card rounded-xl overflow-hidden shadow-custom animate-pulse">
                <div className="h-48 bg-background-light"></div>
                <div className="p-6">
                  <div className="h-6 bg-background-light rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-background-light rounded w-full mb-2"></div>
                  <div className="h-4 bg-background-light rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-background-light rounded w-4/6 mb-4"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 w-8 bg-background-light rounded-full"></div>
                    <div className="h-8 w-8 bg-background-light rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;