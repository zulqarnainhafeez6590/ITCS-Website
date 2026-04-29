import React from 'react'
import ContactHero from './ContactHero/ContactHero'
import ContactForm from './ContactForm/ContactForm'
import ContactMap from './ContactMap/ContactMap'
import './Contact.scss'

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactMap />
      <div className="contact-map-embed">
        <iframe 
          title="ITCS Karachi Office Location"
          width="100%" 
          height="350" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Plot+6+K+Block+2+PECHS+Karachi+Pakistan&amp;aq=0&amp;output=embed"
        ></iframe>
      </div>
    </>
  )
}

export default Contact