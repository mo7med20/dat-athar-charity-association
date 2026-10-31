import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  delay = 0,
  className = 'w-full',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
