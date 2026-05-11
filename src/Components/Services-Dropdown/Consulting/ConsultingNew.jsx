import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../_shared/service-common.scss';
import './ConsultingNew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBriefcase, faChartLine, faHandshake, faLightbulb, faRocket, faUsers, faCogs, faTrophy } from '@fortawesome/free-solid-svg-icons';

const ConsultingHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="consulting-hero-section">
      <div className="hero-badge">
        <FontAwesomeIcon icon={faBriefcase} />
        <span>CONSULTING SERVICES</span>
      </div>
      <h1 className="hero-title">
        Strategy for Business<br />
        <span className="gradient-text">Transformation</span>
      </h1>
      <p className="hero-description">
        Success in a changing world requires a purpose-driven transformative strategy. 
        We help organizations navigate digital transformation with strategic planning and expert guidance.
      </p>
      <div className="hero-actions">
        <button className="btn-secondary" onClick={() => navigate('/contact')}>
          Start Consultation
          <span>→</span>
        </button>
      </div>
    </section>
  );
};

const ConsultingSection2 = () => {
  const services = [
    { icon: faChartLine, title: 'Strategic Planning', desc: 'Expert business strategy development' },
    { icon: faHandshake, title: 'Digital Transformation', desc: 'Modernize your business processes' },
    { icon: faLightbulb, title: 'Innovation Consulting', desc: 'Drive innovation across organization' },
    { icon: faRocket, title: 'Growth Strategy', desc: 'Scale your business effectively' }
  ]

  return (
    <div className='consultingSection2'>
      <div className="consultingSection2-wrapper">
        <div className="content-side">
          <h2>Expert Business Consulting for Growth</h2>
          <p>Transform your business with our comprehensive consulting solutions. We deliver strategic guidance and expert advice tailored to meet your specific business requirements.</p>
          <p>From startup to enterprise, our consulting services grow with your business, providing the insights you need to succeed.</p>
          
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
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600" alt="Business Consulting" />
        </div>
      </div>
    </div>
  )
}

const ConsultingFeatures = () => {
  const features = [
    { icon: faCogs, title: 'Process Optimization', description: 'Streamline operations for efficiency' },
    { icon: faChartLine, title: 'Financial Consulting', description: 'Expert financial planning and analysis' },
    { icon: faUsers, title: 'Organizational Development', description: 'Build high-performing teams' },
    { icon: faLightbulb, title: 'Innovation Strategy', description: 'Drive innovation and growth' }
  ];

  return (
    <section className="consulting-features-section">
      <div className="section-header">
        <h2>Our Consulting Services</h2>
        <p>Professional consulting to help your business thrive</p>
      </div>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <div className="card-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ConsultingSection4 = () => {
  const benefits = [
    { title: 'Expert Consultants', description: 'Team of certified professionals with years of experience' },
    { title: 'Proven Methodology', description: 'Data-driven approach for measurable results' },
    { title: 'Tailored Solutions', description: 'Customized strategies for your specific needs' },
    { title: 'Long-term Partnership', description: 'Ongoing support for sustainable growth' }
  ];

  return (
    <div className="consultingSection4">
      <div className="section-header">
        <h2>Why Choose ITCS for Consulting?</h2>
        <p>Partner with experts who understand your business</p>
      </div>
      <div className="benefits-grid">
        {benefits.map((benefit, idx) => (
          <div className="benefit-item" key={idx}>
            <div className="benefit-check">✓</div>
            <div className="benefit-text">
              <strong>{benefit.title}</strong>
              <span>{benefit.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConsultingSection3 = () => {
  const benefits = [
    { text: '200+ Projects Delivered' },
    { text: '15+ Years Experience' },
    { text: '98% Client Satisfaction' },
    { text: 'Industry Experts' }
  ]

  return (
    <div className='consultingSection3'>
      <div className="logo-section">
        <div className="logo-card">
          <span className="logo-icon">📊</span>
          <span>McKinsey</span>
        </div>
        <div className="logo-card">
          <span className="logo-icon">💼</span>
          <span>Deloitte</span>
        </div>
        <div className="logo-card">
          <span className="logo-icon">🔷</span>
          <span>BCG</span>
        </div>
        <div className="logo-card">
          <span className="logo-icon">📈</span>
          <span>Bain</span>
        </div>
      </div>
      <div className="benefits-row">
        {benefits.map((item, idx) => (
          <div className="benefit-item" key={idx}>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ConsultingCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="consulting-cta">
      <div className="cta-container">
        <h2>
          Let's Discuss Your <span className="gradient-text">Project</span>
        </h2>
        <p>Get free consultation and transform your business with expert guidance.</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>
          Get Free Consultation
          <span>→</span>
        </button>
        <div className="cta-stats">
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultingNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ConsultingHero />
      <ConsultingSection2 />
      <ConsultingFeatures />
      <ConsultingSection4 />
      <ConsultingSection3 />
      <ConsultingCTA />
    </>
  );
};

export default ConsultingNew;