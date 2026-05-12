import React, { useEffect } from 'react';
import CyberHero from './CyberHero/CyberHero';
import CyberSection2 from './CyberSection2/CyberSection2';
import CyberSection4 from './CyberSection4/CyberSection4';
import CyberFeatures from './CyberFeatures/CyberFeatures';
import CyberCTA from './CyberCTA/CyberCTA';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft, faGoogle, faAws } from '@fortawesome/free-brands-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const cyberPartners = [
  { icon: faMicrosoft, name: 'Microsoft Security', type: 'Gold Partner', description: 'Certified Microsoft security solutions partner delivering Defender, Sentinel, and identity protection services.', status: 'Verified Partner' },
  { icon: faAws, name: 'AWS Security', type: 'Advanced Partner', description: 'AWS security partner specializing in cloud security posture management and threat detection.', status: 'Verified Partner' },
  { icon: faShieldHalved, name: 'Palo Alto Networks', type: 'Technology Partner', description: 'Authorized partner for next-generation firewalls, endpoint protection, and threat intelligence.', status: 'Verified Partner' },
];

const CyberSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CyberHero />
      <CyberSection2 />
      <CyberFeatures />
      <PartnerLogos partners={cyberPartners} />
      <CyberSection4 />
      <CyberCTA />
    </>
  );
};

export default CyberSecurity;