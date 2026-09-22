import './Hero.css'

const Hero = ({ imageUrl, title, subtitle, children }) => {
  return (
    <section className="hero">
      {/* Background image */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="hero-overlay"></div>

      {/* Hero content */}
      <div className="hero-content">
        {children}
        {title && <h1 className="hero-title">{title}</h1>}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>

      {/* Sentinel for navbar scroll detection */}
      <div id="hero-sentinel" className="hero-sentinel"></div>
    </section>
  )
}

export default Hero
