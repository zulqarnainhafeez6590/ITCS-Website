import React from 'react';
import itcsLogo from "../../assets/logos/itcsLogo.png";
import Twitter from "./../../assets/logos/Twitter.svg";
import Facebook from "./../../assets/logos/Facebook.svg";
import Instagram from "./../../assets/logos/Instagram.svg";
import LinkedIn from "./../../assets/logos/LinkedIn.svg";
import { Link } from 'react-router-dom';
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo & Intro Section */}
        <div className="footer-col logo-section">
          <a href="/" className="logo-link">
            <img src={itcsLogo} alt="ITCS Logo" className="itcs-logo" />
          </a>
          <p className="intro-para">
            ITCS strives to provide its customers with the best possible
            solutions using the latest available technology.
          </p>
          <div className="social-icons">
            <a href="https://x.com/itcspakistan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">
              <img src={Twitter} alt="X" />
            </a>
            <a href="https://www.facebook.com/itcspakistan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/itcs.pakistan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/itconsultingandservices" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <img src={LinkedIn} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Head Office Info */}
        <div className="footer-col info-section">
          <h3>Head Office</h3>
          <div className="contact-info">
            <p><span className="icon">📍</span> 6/K Block 2, P.E.C.H.S, Karachi, Pakistan</p>
            <p><span className="icon">📧</span> <a href="mailto:info@itcs.com.pk">info@itcs.com.pk</a></p>
            <p><span className="icon">📞</span> <a href="tel:+9221111482711">021 111-482-711</a></p>
            <p><span className="icon">📠</span> Fax: 021 4554818</p>
          </div>
        </div>

        {/* Services Links */}
        <div className="footer-col services-section">
          <h3>Services</h3>
          <ul className="services-links">
            <li><Link to="/services/cloud">Cloud Solutions</Link></li>
            <li><Link to="/services/consulting">IT Consulting</Link></li>
            <li><Link to="/services/enterprise-solutions">Enterprise Solutions</Link></li>
            <li><Link to="/services/it-services">IT Services</Link></li>
            <li><Link to="/services/network-solutions">Network Solutions</Link></li>
            <li><Link to="/services/cyber-security">Cybersecurity</Link></li>
            <li><Link to="/services/web-development">Web Development</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col quick-links">
          <h3>Quick Links</h3>
          <ul className="links-list">
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} ITCS Pakistan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;