import Logo from './Logo'
import './Marquee.css'

const Marquee = () => {
  // Repeating content block — duplicated for seamless loop
  const items = Array.from({ length: 6 })

  const renderBlock = (blockKey) => (
    <div className="marquee-block" key={blockKey}>
      {items.map((_, i) => (
        <div className="marquee-item" key={i}>
          <span className="marquee-text">Memento Memories</span>
          <span className="marquee-star">✦</span>
          <span className="marquee-logo">
            <Logo variant="light" size="sm" showWordmark={false} />
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {renderBlock('a')}
        {renderBlock('b')}
      </div>
    </section>
  )
}

export default Marquee
