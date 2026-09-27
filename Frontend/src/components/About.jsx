import { Link } from 'react-router-dom'
import Hero from './Hero'
import './styles/About.css'

const About = () => {
  return (
    <div className="about-page">

      {/* ===== HERO ===== */}
      <Hero
        imageUrl="https://picsum.photos/id/1027/1600/900"
        title="About"
        subtitle="The person behind the photographs"
        size="compact"
      />

      {/* ===== INTRO — TWO COLUMN ===== */}
      <section className="about-intro">
        <div className="about-intro-grid">

          {/* Left — Portrait */}
          <div className="about-portrait-col">
            <div className="about-portrait">
              <img
                src="https://picsum.photos/id/1005/800/1000"
                alt="Vashish Cahanoo portrait"
                loading="lazy"
              />
            </div>
            <div className="about-portrait-caption">
              <span className="about-portrait-dot" />
              <span>Vashish Cahanoo in studio, Port Louis, Mauritius</span>
            </div>
          </div>

          {/* Right — Bio */}
          <div className="about-bio-col">
            <span className="about-eyebrow">The Photographer</span>
            <h2 className="about-heading">Vashish Cahanoo</h2>

            <div className="about-bio-text">
              <p>
                Born and based in Mauritius, Vashish grew up between the
                turbulent reef tides of the Indian Ocean and the quiet
                solitude of sugarcane plateaus. A borrowed manual 35mm
                rangefinder taught him to see before pressing the shutter.
              </p>
              <p className="about-bio-quote">
                "My practice is rooted in quiet observation. Rather than
                staging moments, I wait for honest light and unprompted
                human gesture. Whether capturing an intimate cliffside
                wedding or an ancient highland landscape, the objective
                remains singular: preserving emotion with cinematic
                restraint."
              </p>
              <p>
                Today, Memento Memories works on selected commissions
                across Mauritius and beyond — creating fine art wedding
                collections, expressive portraits, and atmospheric
                natural studies.
              </p>
            </div>

            <div className="about-signature-row">
              <span className="about-signature">— Vashish</span>
            </div>
          </div>

        </div>
      </section>

      {/* ===== PHILOSOPHY BAND ===== */}
      <section className="about-philosophy">
        <div className="about-philosophy-inner">

          <span className="about-philosophy-eyebrow">The Approach</span>

          <blockquote className="about-philosophy-quote">
            "I photograph the moments between the moments — the quiet
            glance, the stillness before the vow, the light that only
            lasts a second."
          </blockquote>

          <cite className="about-philosophy-cite">— Vashish Cahanoo</cite>

          {/* Three Pillars */}
          <div className="about-pillars">
            <div className="about-pillar">
              <span className="about-pillar-dot" />
              <h3 className="about-pillar-title">Quiet Observation</h3>
              <p className="about-pillar-text">
                I wait for the moment to arrive naturally, avoiding
                artificial choreography and forced postures.
              </p>
            </div>

            <div className="about-pillar">
              <span className="about-pillar-dot" />
              <h3 className="about-pillar-title">Honest Light</h3>
              <p className="about-pillar-text">
                Natural directional light, gentle ambient dusk, and
                twilight shadows — never overdone or synthetic.
              </p>
            </div>

            <div className="about-pillar">
              <span className="about-pillar-dot" />
              <h3 className="about-pillar-title">Lasting Stories</h3>
              <p className="about-pillar-text">
                Archival imagery crafted to age with grace, dignity,
                and deep emotional resonance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== SERVICES — WHAT I PHOTOGRAPH ===== */}
      <section className="about-services">
        <div className="about-services-inner">

          <div className="about-services-header">
            <span className="about-eyebrow">Selected Work</span>
            <h2 className="about-heading-lg">What I Photograph</h2>
          </div>

          <div className="about-services-grid">
            <div className="about-service-card">
              <span className="about-service-line" />
              <span className="about-service-number">01 / Ceremony</span>
              <h3 className="about-service-title">Weddings</h3>
              <p className="about-service-text">
                Intimate destination ceremonies, quiet celebrations, and
                unscripted vows bathed in atmospheric natural light.
              </p>
            </div>

            <div className="about-service-card">
              <span className="about-service-line" />
              <span className="about-service-number">02 / Studio</span>
              <h3 className="about-service-title">Portraits</h3>
              <p className="about-service-text">
                Expressive editorial studies of artists, writers, and
                individuals seeking depth and authentic presence.
              </p>
            </div>

            <div className="about-service-card">
              <span className="about-service-line" />
              <span className="about-service-number">03 / Archival</span>
              <h3 className="about-service-title">Nature</h3>
              <p className="about-service-text">
                Misty coastal cliffs, silent evergreen forests, and fine
                art landscape archival prints for private collectors.
              </p>
            </div>

            <div className="about-service-card">
              <span className="about-service-line" />
              <span className="about-service-number">04 / Atelier</span>
              <h3 className="about-service-title">Commercials</h3>
              <p className="about-service-text">
                Still-life campaigns, bespoke artisan craftsmanship, and
                thoughtful tactile branding imagery.
              </p>
            </div>
          </div>

        </div>
      </section>

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

export default About
