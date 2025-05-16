import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/Project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-background-card rounded-xl overflow-hidden shadow-custom transition-all duration-300 hover:shadow-custom-lg group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-background-light bg-opacity-80 px-2 py-1 rounded-md text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-text-secondary mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors duration-300"
                aria-label="GitHub Repository"
              >
                <Github size={20} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors duration-300"
                aria-label="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium text-accent-500 hover:text-accent-400 transition-colors duration-300"
            onClick={() => {
              // View project details or modal logic here
              console.log('View project details', project);
            }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;