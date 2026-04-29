import React from 'react'
import "./CyberSection3.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faLock, faUserShield, faServer, faShieldHeart } from '@fortawesome/free-solid-svg-icons'

const CyberSection3 = () => {
  const benefits = [
    { icon: faCheckCircle, text: 'ISO 27001 Certified' },
    { icon: faLock, text: 'CISSP Experts' },
    { icon: faShieldHeart, text: 'Industry Recognition' },
    { icon: faServer, text: '24/7 Support' }
  ]

  return (
    <div className='cyberSection3'>
      <div className="container">
        <div className="logo-section">
          <div className="logo-card">
            <div className="logo-icon">🛡️</div>
            <span>Microsoft Security</span>
          </div>
          <div className="logo-card">
            <div className="logo-icon">🔐</div>
            <span>Cisco Security</span>
          </div>
          <div className="logo-card">
            <div className="logo-icon">🔒</div>
            <span>Palo Alto</span>
          </div>
          <div className="logo-card">
            <div className="logo-icon">🟢</div>
            <span>Sophos</span>
          </div>
        </div>

        <div className="benefits-row">
          {benefits.map((item, idx) => (
            <div className="benefit-item" key={idx}>
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CyberSection3