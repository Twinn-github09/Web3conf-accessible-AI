import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box>{children}</Box>
        </motion.div>
      )}
    </div>
  );
};

export default TabPanel;