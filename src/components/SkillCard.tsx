import { motion } from 'framer-motion';
import { Skill } from '../types/Skill';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  return (
    <motion.div
      className="bg-background-card p-6 rounded-xl flex items-center shadow-custom transition-all duration-300 hover:shadow-custom-lg group hover:bg-background-light"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="mr-4 text-accent-400">
        {/* Icon would go here - you can use Lucide icons or custom SVGs */}
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background-dark group-hover:bg-background-card">
          {skill.icon ? (
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-7 h-7"
            />
          ) : (
            <div className="w-7 h-7 flex items-center justify-center font-mono font-bold text-xl">
              {skill.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
        <div className="mt-1 w-full bg-background-dark rounded-full h-1.5">
          <motion.div
            className="bg-accent-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
          ></motion.div>
        </div>
        <p className="text-xs text-right mt-1 text-text-secondary">{skill.proficiency}%</p>
      </div>
    </motion.div>
  );
};

export default SkillCard;