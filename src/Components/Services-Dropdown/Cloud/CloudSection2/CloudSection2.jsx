import React from 'react'
import "./CloudSection2.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDatabase, faGlobe, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import CloudHeroImg from './../../../../assets/images/cloudSection2.jpg'

const CloudSection2 = () => {
  const services = [
    { icon: faCloud, title: 'Cloud Infrastructure', desc: 'Scalable and reliable cloud servers' },
    { icon: faDatabase, title: 'Data Storage', desc: 'Secure cloud databases' },
    { icon: faGlobe, title: 'Global Network', desc: 'Worldwide data centers' },
    { icon: faShieldAlt, title: 'Advanced Security', desc: 'Enterprise-grade protection' }
  ];

  return (
    <div className='cloudSection2'>
      <div className="cloudSection2-wrapper">
        <div className="content-side">
          <h2>Enterprise Cloud Solutions for Modern Business</h2>
          <p>Transform your business operations with our comprehensive cloud computing solutions. We deliver scalable, secure, and cost-effective cloud services tailored to meet your specific business requirements.</p>
          <p>From startup to enterprise, our cloud solutions grow with your business, providing the flexibility and power you need to succeed in the digital age.</p>
          
          <div className="services-list">
            {services.map((item, idx) => (
              <div className="service-item" key={idx}>
                <div className="service-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="image-side">
          <img src={CloudHeroImg} alt="Cloud Solutions" />
        </div>
      </div>
    </div>
  )
}

export default CloudSection2