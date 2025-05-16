import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Code, Cloud } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="min-h-screen relative flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-500 opacity-5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary-500 opacity-5 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.span 
              className="inline-block py-1 px-3 text-sm bg-background-light rounded-full text-accent-500 font-medium mb-4"
              variants={itemVariants}
            >
              Full Stack Web Developer
            </motion.span>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              Building <span className="text-accent-500">digital</span> experiences that matter
            </motion.h1>
            
            <motion.p 
              className="text-text-secondary text-lg md:text-xl mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Transforming ideas into user-centric solutions with modern technologies and clean, efficient code. Specializing in React, Next.js, Node.js, and more.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link to={'/experience'}>
              <motion.div
                // href="/projects"
                className="bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Work <ArrowRight size={18} />
              </motion.div>
              </Link>
              <Link to={'/contact'}>
              <motion.div
                // href="/contact"
                className="bg-transparent border border-gray-700 hover:border-accent-600 hover:text-accent-500 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.div>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:block"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Decorative code elements */}
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-background-light rounded-lg p-4 shadow-custom z-10">
                <div className="code-font text-sm text-green-400">
                  <span className="text-purple-400">function</span> <span className="text-yellow-400">createExperience</span>() {"{"}
                  <br />&nbsp;&nbsp;<span className="text-purple-400">return</span> {"{"}
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;result: <span className="text-orange-400">'amazing'</span>,
                  <br />&nbsp;&nbsp;&nbsp;&nbsp;quality: <span className="text-orange-400">'excellent'</span>
                  <br />&nbsp;&nbsp;{"}"};
                  <br />{"}"}
                </div>
              </div>
              
              <div className="relative z-20 bg-background-card rounded-xl overflow-hidden shadow-custom">
                <div className="bg-background-light px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-text-secondary ml-2 code-font">portfolio.tsx</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background-dark p-4 rounded-lg flex items-center gap-3">
                      <Code className="text-primary-500" size={24} />
                      <div>
                        <h3 className="font-medium text-white">Frontend</h3>
                        <p className="text-xs text-text-secondary">React, Next.js, TypeScript</p>
                      </div>
                    </div>
                    <div className="bg-background-dark p-4 rounded-lg flex items-center gap-3">
                      <Cpu className="text-secondary-500" size={24} />
                      <div>
                        <h3 className="font-medium text-white">Backend</h3>
                        <p className="text-xs text-text-secondary">DRF, Node.js, Express</p>
                      </div>
                    </div>
                    <div className="bg-background-dark p-4 rounded-lg flex items-center gap-3">
                      <Cloud className="text-accent-500" size={24} />
                      <div>
                        <h3 className="font-medium text-white">DevOps</h3>
                        <p className="text-xs text-text-secondary">CI/CD, Git, Docker</p>
                      </div>
                    </div>
                    <div className="bg-background-dark p-4 rounded-lg flex items-center gap-3">
                      <motion.div 
                        className="relative w-6 h-6"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-primary-500 border-t-transparent"></div>
                      </motion.div>
                      <div>
                        <h3 className="font-medium text-white">Learning</h3>
                        <p className="text-xs text-text-secondary">Always improving</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-background-light rounded-lg p-4 shadow-custom">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-xs text-text-secondary code-font">// Experience</div>
                  <div className="text-sm">
                    <span className="text-purple-400">const</span> <span className="text-blue-400">experience</span> = {"{"}
                    <br />&nbsp;&nbsp;frontend: <span className="text-orange-400">'1+ year'</span>,
                    <br />&nbsp;&nbsp;backend: <span className="text-orange-400">'6 months'</span>
                    <br />{"}"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;