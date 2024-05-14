import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for smooth exit animations
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import Transition from './Transition';
import aboutMeData from './../data';
import { useScrollTo } from 'framer-motion-scroll-to-hook';

//eslint-disable-next-line react-hooks/rules-of-hooks
const scrollTo = useScrollTo();

function Info() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
    const handleTitleClick = (index: number) => {
      setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
      scrollTo(100);
    };
  
    return (
      <Transition className="Info">
        {aboutMeData.map((entry, index) => (
          <AnimatePresence>
            <motion.div key={index} className="About">
              <motion.div
                style={{ display: 'flex', alignItems: 'baseline', maxHeight: '200px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p
                  style={{ opacity: '.3', marginRight: '10px', flexShrink: 0 }}
                  layout
                >
                  {entry.date}
                </motion.p>
                <motion.div className="info" style={{ maxWidth: "500px", flexGrow: 1 }}>
                  <motion.h4
                    onClick={() => handleTitleClick(index)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {entry.title}
                    {expandedIndex === index ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                  </motion.h4>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        className="Description"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }} // Adjust the duration as needed
                      >
                        <p>{entry.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ))}
      </Transition>
    );
  }
  
  export default Info;
  