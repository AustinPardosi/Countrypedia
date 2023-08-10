import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountryCard, { Country } from "./card";

interface CountryCardProps {
  country: Country;
  index: number;
}

const AnimatedCountryCard: React.FC<CountryCardProps> = ({ country, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <CountryCard country={country} />
    </motion.div>
  );
};

export default AnimatedCountryCard;