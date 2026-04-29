import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alignitLogo from '../../assets/logos/itcsLogo.png'
import './Header.scss'

const Header = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)
  const closeMenu = () => setIsOpen(false)

  const handleServiceNavigation = (e) => {
    if (window.innerWidth > 992) {
      e.preventDefault()
      navigate('/services')
    }
  }

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
                  <a className="nav-link active" onClick={() => { navigate('/'); closeMenu() }} style={{ cursor: 'pointer' }}>
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/services"
                    id="servicesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => { handleServiceNavigation(e); closeMenu() }}
                  >
                    Services
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/cloud'); closeMenu() }} style={{ cursor: 'pointer' }}>Cloud Solutions</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/cyber-security'); closeMenu() }} style={{ cursor: 'pointer' }}>Cybersecurity</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/consulting'); closeMenu() }} style={{ cursor: 'pointer' }}>Consulting</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/enterprise-solutions'); closeMenu() }} style={{ cursor: 'pointer' }}>Enterprise Solutions</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/it-services'); closeMenu() }} style={{ cursor: 'pointer' }}>IT Services</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/network-solutions'); closeMenu() }} style={{ cursor: 'pointer' }}>Network Solutions</a></li>
                    <li><a className="dropdown-item" onClick={() => { navigate('/services/web-development'); closeMenu() }} style={{ cursor: 'pointer' }}>Web Development</a></li>
                  </ul>
                </li>
                
                <li className="nav-item"><a className="nav-link" onClick={() => { navigate('/vision-mission'); closeMenu() }} style={{ cursor: 'pointer' }}>Vision & Mission</a></li>
                <li className="nav-item"><a className="nav-link" onClick={() => { navigate('/blog'); closeMenu() }} style={{ cursor: 'pointer' }}>Blogs</a></li>
                <li className="nav-item"><a className="nav-link" onClick={() => { navigate('/about-us'); closeMenu() }} style={{ cursor: 'pointer' }}>About Us</a></li>
                <li className="nav-item"><a className="nav-link" onClick={() => { navigate('/contact'); closeMenu() }} style={{ cursor: 'pointer' }}>Contact</a></li>
                <li className="nav-item"><a className="nav-link" onClick={() => { navigate('/careers'); closeMenu() }} style={{ cursor: 'pointer' }}>Careers</a></li>
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