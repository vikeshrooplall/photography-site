const Logo = ({ variant = 'dark', size = 'md', showWordmark = false }) => {
  const color = variant === 'light' ? '#F7F5F2' : '#061222'
  const wordmarkColor = variant === 'light' ? '#F7F5F2' : '#061222'

  const sizes = {
    sm: { markHeight: 32, wordmarkSize: '0.9rem', gap: '12px' },
    md: { markHeight: 48, wordmarkSize: '1.15rem', gap: '14px' },
    lg: { markHeight: 80, wordmarkSize: '1.6rem', gap: '18px' }
  }

  const current = sizes[size]

  return (
    <div className="logo" style={{ gap: current.gap }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 260 100"
        height={current.markHeight}
        width={(current.markHeight * 260) / 100}
        shapeRendering="geometricPrecision"
        aria-label="Memento Memories monogram"
        role="img"
      >
        {/* Left M */}
        <path
          d="M-60,50 L-60,-50 L0,15 L0,-50 L60,50"
          transform="translate(60, 50)"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />

        {/* Right M — pre-mirrored */}
        <path
          d="M60,50 L60,-50 L0,15 L0,-50 L-60,50"
          transform="translate(200, 50)"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {showWordmark && (
        <span
          className="logo-wordmark"
          style={{
            color: wordmarkColor,
            fontSize: current.wordmarkSize
          }}
        >
          MEMENTO MEMORIES
        </span>
      )}
    </div>
  )
}

export default Logo
