import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

export const parentVariants = {
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const StaggerChildren = ({ children, className }: Props) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="initial"
      variants={parentVariants}
      className={`flex flex-col gap-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default StaggerChildren;
