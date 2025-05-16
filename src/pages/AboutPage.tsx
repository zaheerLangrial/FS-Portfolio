import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { Code, Server, Database, Coffee, Lightbulb, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Frontend Experience', value: '1+ year' },
    { label: 'Backend Experience', value: '6 months' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Coffee Consumed', value: 'Lots' },
  ];

  return (
    <div className="pt-20 pb-16">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <SectionHeading 
            title="About Me" 
            subtitle="Learn more about my background, experience, and what drives me as a developer." 
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Hello! I'm <span className="text-accent-500">a Full Stack Developer</span>
              </h3>
              
              <p className="text-text-secondary mb-4">
                I'm a passionate Full Stack Web Developer with over a year of experience in frontend technologies and six months of backend development. My journey in web development started with a curiosity about how websites work, which quickly turned into a passion for building digital experiences that solve real-world problems.
              </p>
              
              <p className="text-text-secondary mb-4">
                On the frontend, I specialize in ReactJS, Next.js, TypeScript, and TailwindCSS, creating responsive and intuitive user interfaces. My backend expertise includes Node.js, Express, MongoDB, and Django Rest Framework, where I focus on building scalable and secure APIs.
              </p>
              
              <p className="text-text-secondary mb-4">
                Currently, I'm working on B2B, where I've built and integrated APIs, worked on parsers, and written test cases. This role has allowed me to grow as a developer, tackle complex problems, and collaborate with talented teams.
              </p>
              
              <p className="text-text-secondary">
                When I'm not coding, you'll find me learning new technologies, contributing to open-source projects, or exploring new design trends. I believe in continuous learning and strive to stay at the forefront of web development.
              </p>
            </motion.div>
            
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-background-card rounded-xl overflow-hidden shadow-custom relative z-10">
                <img 
                  src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Developer workspace" 
                  className="w-full h-auto"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-dark to-transparent py-8 px-6">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-center"
                      >
                        <p className="text-accent-500 text-xl sm:text-2xl font-bold">{stat.value}</p>
                        <p className="text-text-secondary text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary-600 rounded-lg opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-500 rounded-full opacity-20"></div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SectionHeading 
              title="What I Do" 
              subtitle="My areas of expertise and the services I provide."
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Code className="text-accent-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Frontend Development</h3>
                <p className="text-text-secondary">Building responsive and interactive user interfaces with React, Next.js, TypeScript, and TailwindCSS.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Server className="text-primary-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Backend Development</h3>
                <p className="text-text-secondary">Creating robust APIs and server-side applications with Node.js, Express, and Django Rest Framework.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Database className="text-secondary-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Database Management</h3>
                <p className="text-text-secondary">Designing and implementing database solutions with MongoDB, ensuring optimal data storage and retrieval.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="text-accent-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">API Integration</h3>
                <p className="text-text-secondary">Connecting applications with third-party services and APIs to extend functionality and enhance user experience.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="text-primary-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Problem Solving</h3>
                <p className="text-text-secondary">Analyzing requirements and developing creative solutions to complex technical challenges.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-background-card p-6 rounded-xl shadow-custom"
              >
                <div className="bg-background-light w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="text-secondary-500" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-text-secondary">Staying updated with the latest technologies and best practices in the rapidly evolving web development landscape.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;