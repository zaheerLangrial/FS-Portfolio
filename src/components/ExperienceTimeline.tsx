import { motion } from 'framer-motion';
import { CalendarClock, Briefcase } from 'lucide-react';
import { Experience } from '../types/Experience';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-700 transform md:translate-x-px"></div>
      
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-background-dark transform -translate-x-1.5 md:-translate-x-2 mt-2"></div>
          
          {/* Date section */}
          <div className={`md:w-1/2 md:pr-12 ${index % 2 === 0 ? 'md:pl-12 md:pr-0' : ''} pl-8 md:pl-0`}>
            <div className="flex items-center mb-1 text-accent-500">
              <CalendarClock size={18} className="mr-2" />
              <span className="font-medium">{experience.startDate} - {experience.endDate || 'Present'}</span>
            </div>
            <div className="flex items-center text-text-secondary mb-3">
              <Briefcase size={16} className="mr-2" />
              <span>{experience.company}</span>
            </div>
          </div>
          
          {/* Content section */}
          <div className={`md:w-1/2 md:pl-12 ${index % 2 === 0 ? 'md:pr-12 md:pl-0' : ''} pl-8 md:pl-0`}>
            <h3 className="text-xl font-bold mb-2 text-white">{experience.title}</h3>
            <p className="text-text-secondary mb-4">{experience.description}</p>
            
            {experience.achievements && experience.achievements.length > 0 && (
              <div>
                <h4 className="text-lg font-medium mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {experience.technologies && (
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-background-light text-accent-300 code-font"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;