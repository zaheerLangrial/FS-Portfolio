import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import { getSkills } from '../services/skillService';
import { Skill } from '../types/Skill';
import { Tabs, Spin } from 'antd';

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(skill => skill.category))
        );
        setCategories(['All', ...uniqueCategories]);
        
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSkillsByCategory = (category: string) => {
    if (category === 'All') {
      return skills;
    }
    return skills.filter(skill => skill.category === category);
  };

  // Placeholder skills for loading state
  const placeholderSkills = Array(8).fill(null).map((_, index) => ({
    _id: `placeholder-${index}`,
    name: 'Loading...',
    proficiency: 0,
    category: 'Loading'
  }));

  const displaySkills = loading ? placeholderSkills : skills;

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <SectionHeading 
          title="Skills & Expertise" 
          subtitle="A comprehensive overview of my technical skills and proficiency levels."
          align="center"
        />
        
        {loading ? (
          <div className="py-12 flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="All"
            centered
            items={categories.map(category => ({
              key: category,
              label: category,
              children: (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {getSkillsByCategory(category).map((skill, index) => (
                    <SkillCard key={skill._id} skill={skill} index={index} />
                  ))}
                </motion.div>
              ),
            }))}
          />
        )}
        
        {/* Placeholder skills while loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {placeholderSkills.map((_, index) => (
              <div key={index} className="bg-background-card p-6 rounded-xl flex items-center shadow-custom animate-pulse">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-background-light rounded-lg"></div>
                </div>
                <div className="flex-1">
                  <div className="h-5 bg-background-light rounded w-1/3 mb-3"></div>
                  <div className="h-2 bg-background-light rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsPage;