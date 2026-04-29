import React, { useEffect } from 'react';
import CloudHero from './CloudHero/CloudHero';
import CloudFeatures from './CloudFeatures/CloudFeatures';
import CloudCTA from './CloudCTA/CloudCTA';
import CloudSection1 from './CloudSection1/CloudSection1';
import CloudSection2 from './CloudSection2/CloudSection2';
import CloudSection3 from './CloudSection3/CloudSection3';
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
      <CloudSection3 />
      <CloudCTA />
    </>
  );
};

export default Cloud;
