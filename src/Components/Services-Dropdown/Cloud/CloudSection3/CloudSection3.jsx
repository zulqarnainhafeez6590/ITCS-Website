import React from 'react'
import MicrosoftImg from "./../../../../assets/images/CloudSection3-MicrosoftImg.png"
import AwsImg from "./../../../../assets/images/CloudSection3-AWS.png"
import "./CloudSection3.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faAward, faHandshake } from '@fortawesome/free-solid-svg-icons'

const CloudSection3 = () => {
  const benefits = [
    { icon: faCheckCircle, text: 'Microsoft Gold Partner' },
    { icon: faCheckCircle, text: 'AWS Advanced Partner' },
    { icon: faAward, text: 'Certified Solutions' },
    { icon: faHandshake, text: '24/7 Support' }
  ]

  return (
    <div className='cloudSection3'>
      <div className="container">
        <div className="header">
          <span className="badge">Service Partners</span>
          <h2>Trusted Cloud Partnerships</h2>
          <p>Strategic alliances with world-leading cloud providers to deliver enterprise-grade solutions</p>
        </div>

        <div className="logos-section">
          <div className="logo-card microsoft-card">
            <img src={MicrosoftImg} alt="Microsoft Gold Partner" />
            <span className="label">Microsoft Gold Partner</span>
          </div>
          <div className="logo-card aws-card">
            <img src={AwsImg} alt="AWS Partner" />
            <span className="label">AWS Advanced Partner</span>
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

export default CloudSection3