import React from 'react'
import './PartnerLogos.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const PartnerLogos = ({ partners }) => {
  return (
    <section className="partner-logos">
      <div className="container">
        <div className="section-header">
          <span className="badge">
            <FontAwesomeIcon icon={faStar} />
            Our Partners
          </span>
          <h2>Trusted Technology Partnerships</h2>
          <p>Strategic alliances with industry-leading technology providers to deliver world-class solutions</p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <div className="card-glow"></div>
              <div className="card-icon">
                <FontAwesomeIcon icon={partner.icon} />
              </div>
              <h3>{partner.name}</h3>
              <span className="partner-type">{partner.type}</span>
              <p>{partner.description}</p>
              <div className="partner-badge">
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>{partner.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos
