import React, { useState } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import alignitLogo from '../../assets/logos/itcsLogo.png'
import './Header.scss'

const Header = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="header">
      <div className="header-img">
        <a href="/">
          <img src={alignitLogo} alt="ITCS Logo" />
        </a>
      </div>

      <div className="links">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            
            <div
              className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {/* ← ALL YOUR NAV ITEMS EXACTLY AS BEFORE → */}
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/services"
                    id="servicesDropdown"
                    onClick={closeMenu}
                  >
                    Services
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                    <li><NavLink className="dropdown-item" to="/services/cloud" onClick={closeMenu}>Cloud Solutions</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/cyber-security" onClick={closeMenu}>Cybersecurity</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/consulting" onClick={closeMenu}>Consulting</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/enterprise-solutions" onClick={closeMenu}>Enterprise Solutions</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/it-services" onClick={closeMenu}>IT Services</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/network-solutions" onClick={closeMenu}>Network Solutions</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/services/web-development" onClick={closeMenu}>Web Development</NavLink></li>
                  </ul>
                </li>
                
                <li className="nav-item"><Link className="nav-link" to="/vision-mission" onClick={closeMenu}>Vision & Mission</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog" onClick={closeMenu}>Blogs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about-us" onClick={closeMenu}>About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact" onClick={closeMenu}>Contact</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/careers" onClick={closeMenu}>Careers</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      
      <div className="auth-buttons">
        <button className="btn btn-login" onClick={() => navigate('/login')}>
          Login
        </button>
        <button
          className="custom-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="custom-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        
      </div>
    </div>
  )
}

export default Header