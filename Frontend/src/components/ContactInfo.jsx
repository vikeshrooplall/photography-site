import './ContactInfo.css'

const ContactInfo = () => {
  return (
    <div className="contact-info">

      {/* Section label + heading */}
      <div className="contact-info-header">
        {/* <span className="contact-info-eyebrow">Reach Out</span> */}
        <h2 className="contact-info-heading">
          Have something in mind? Let's bring it to life.
        </h2>
      </div>

      {/* Contact details */}
      <div className="contact-info-details">
        <div className="contact-info-item">
          <span className="contact-info-label">Email</span>
          <a
            href="mailto:hello@mementomemories.com"
            className="contact-info-value"
          >
            vashish220797@gmail.com
          </a>
        </div>

        <div className="contact-info-item">
          <span className="contact-info-label">Phone</span>
          <a
            href="tel:+23050000000"
            className="contact-info-value"
          >
            +230 5966 6787
          </a>
        </div>

        <div className="contact-info-item">
          <span className="contact-info-label">Location</span>
          <span className="contact-info-value">
            Mauritius
          </span>
        </div>
      </div>

      {/* Editorial invitation */}
      <div className="contact-info-note">
        <p>
          Welcoming inquiries for destination weddings, intimate editorial
          portraits, fine art nature prints, and commercial still life
          campaigns. Every assignment receives dedicated, quiet attention.
        </p>
      </div>

      {/* Social links */}
      <div className="contact-info-social">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info-social-link"
        >
          <span>Instagram</span>
          <span className="contact-info-social-arrow">↗</span>
        </a>
        <span className="contact-info-social-divider">•</span>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info-social-link"
        >
          <span>Pinterest</span>
          <span className="contact-info-social-arrow">↗</span>
        </a>
      </div>

    </div>
  )
}

export default ContactInfo
