import React from "react";
import "./HomeFeature.scss";
import { Link } from 'react-router-dom'
import CyberSecurityImg from "./../../../assets/images/modern-cybersecurity-feature.png";

const HomeFeature = () => {
  const features = [
    {
      title: "Penetration Testing",
      description: "Ensure Complete Cybersecurity – Let Us Help You Find Issues, Verify Mitigations, and Manage Assessments."
    },
    {
      title: "Automated Security",
      description: "Safeguarding Your Business Operations with Comprehensive Network Security Solutions and Expert Services."
    }
  ];

  return (
    <section className="home-feature">
      <div className="feature-container">
        <div className="feature-content">
          <span className="feature-badge">SECURITY FIRST</span>
          <h3 className="feature-subtitle">Cybersecurity</h3>
          <h2 className="feature-title">Reimagined, Reinvented, Reinforced.</h2>
          <p className="feature-description">
            Safeguarding Your Business's Legacy and Reputation – Our Comprehensive
            Cybersecurity Solutions Keep You Protected from the Devastating Impacts
            of Cyber-Incidents.
          </p>

          <div className="feature-list">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="item-content">
                  <h4 className="item-title">{feature.title}</h4>
                  <p className="item-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/services/cyber-security" className="feature-btn">
            Explore Solutions
            <span className="btn-arrow">→</span>
          </Link>
        </div>

        <div className="feature-image">
          <div className="image-glow"></div>
          <img src={CyberSecurityImg} alt="Cybersecurity" />
          <div className="image-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;

