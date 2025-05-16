import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  align = 'left' 
}: SectionHeadingProps) => {
  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      className={`mb-10 ${textAlign[align]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="text-white">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-accent-500 mt-4 ${
        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
      }`}></div>
    </motion.div>
  );
};

export default SectionHeading;