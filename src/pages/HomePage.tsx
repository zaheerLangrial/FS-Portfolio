import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';
import { getSkills } from '../services/skillService';
import { Project } from '../types/Project';
import { Skill } from '../types/Skill';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, skillsData] = await Promise.all([
          getProjects(3), // Fetch just 3 projects for the homepage
          getSkills(6)    // Fetch just 6 skills for the homepage
        ]);
        
        setProjects(projectsData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show placeholder data while loading
  const placeholderProjects: Project[] = loading ? [
    {
      _id: '1',
      title: 'Project 1',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Tech 1', 'Tech 2'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    },
    {
      _id: '2',
      title: 'Project 2',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Tech 1', 'Tech 2'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    },
    {
      _id: '3',
      title: 'Project 3',
      description: 'Loading project description...',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Tech 1', 'Tech 2'],
      githubUrl: '',
      liveUrl: '',
      featured: true
    }
  ] : [];

  const placeholderSkills: Skill[] = loading ? [
    { _id: '1', name: 'React', proficiency: 85, category: 'Frontend' },
    { _id: '2', name: 'Node.js', proficiency: 75, category: 'Backend' },
    { _id: '3', name: 'TypeScript', proficiency: 80, category: 'Language' },
    { _id: '4', name: 'MongoDB', proficiency: 70, category: 'Database' }
  ] : [];

  const displayProjects = projects.length > 0 ? projects : placeholderProjects;
  const displaySkills = skills.length > 0 ? skills : placeholderSkills;

  return (
    <>
      <HeroSection />
      
      <section id="featured-projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Check out some of my latest work and contributions."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-background-light rounded-lg text-white font-medium hover:bg-background-card transition-colors"
              >
                View All Projects <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light">
        <div className="container mx-auto">
          <SectionHeading 
            title="Skills & Expertise" 
            subtitle="Technologies and tools I've been working with."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySkills.map((skill, index) => (
              <SkillCard key={skill._id} skill={skill} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/skills"
                className="inline-flex items-center px-6 py-3 bg-background-card rounded-lg text-white font-medium hover:bg-opacity-80 transition-colors"
              >
                View All Skills <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section id="about-preview" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading title="About Me" />
              <p className="text-text-secondary text-lg mb-6">
                I'm a Full Stack Web Developer with over a year of experience in frontend technologies 
                like React and Next.js, and six months of professional backend development with Node.js 
                and MongoDB.
              </p>
              <p className="text-text-secondary text-lg mb-6">
                My journey in web development has allowed me to work on a variety of projects, from 
                hospital services applications to boxing websites, and I'm currently contributing to 
                B2B, where I'm building APIs, working on parsers, and writing test cases.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-accent-600 rounded-lg text-white font-medium hover:bg-accent-700 transition-colors"
                >
                  More About Me <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative z-10 rounded-xl overflow-hidden shadow-custom-lg">
                <img 
                  src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Coding workspace" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-white">
                    <p className="text-2xl font-bold">Full Stack Developer</p>
                    <p className="text-accent-400">Frontend: 1+ year | Backend: 6 months</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-500 rounded-lg"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary-600 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;