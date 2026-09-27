import { Link } from 'react-router-dom'
import Hero from './Hero'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'
import './styles/Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">

      {/* ===== HERO ===== */}
      <Hero
        imageUrl="https://picsum.photos/id/1043/1600/900"
        title="Let's Talk"
        subtitle="Whether it's a wedding, a portrait, or something in between."
        size="compact"
      />

      {/* ===== MAIN CONTENT ===== */}
      <main className="contact-main">
        <div className="contact-grid">
          <div className="contact-col contact-col--info">
            <ContactInfo />
          </div>
          <div className="contact-col contact-col--form">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-name">Memento Memories</p>
            <p className="footer-tagline">Photography by Vashish Cahanoo</p>
          </div>

          <div className="footer-links">
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} Memento Memories — Photography by Vashish Cahanoo
        </p>
      </footer>

    </div>
  )
}

export default Contact
