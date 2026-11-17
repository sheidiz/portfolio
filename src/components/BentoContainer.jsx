import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BentoContainer = ({
  className,
  children,
  initial,
  animate,
  transition,
}) => {
  return (
    <motion.div
      className={`rounded-2xl border border-secondary bg-lightbox p-4 dark:bg-darkbox ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

BentoContainer.propTypes = {
  animate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  initial: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  transition: PropTypes.object,
};

export default BentoContainer;
