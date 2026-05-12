import React, { useEffect } from 'react';
import CloudHero from './CloudHero/CloudHero';
import CloudFeatures from './CloudFeatures/CloudFeatures';
import CloudCTA from './CloudCTA/CloudCTA';
import CloudSection2 from './CloudSection2/CloudSection2';
import CloudSection4 from './CloudSection4/CloudSection4';

const Cloud = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CloudHero />
      <CloudSection2 />
      <CloudFeatures />
      <CloudSection4 />
      <CloudCTA />
    </>
  );
};

export default Cloud;
