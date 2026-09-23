import { useEffect, useRef } from 'react'
import './Lightbox.css'

const Lightbox = ({ photos, currentIndex, onClose, onNavigate }) => {
  const closeButtonRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const currentPhoto = photos[currentIndex]

  // Keyboard handling: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onNavigate(-1)
      } else if (e.key === 'ArrowRight') {
        onNavigate(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate])

  // Body scroll lock + focus management
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement

    document.body.style.overflow = 'hidden'

    // Focus the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    return () => {
      document.body.style.overflow = previousOverflow
      // Restore focus to the element that opened the lightbox
      if (previousFocus && previousFocus.focus) {
        previousFocus.focus()
      }
    }
  }, [])

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left → next
      onNavigate(1)
    } else if (distance < -minSwipeDistance) {
      // Swipe right → previous
      onNavigate(-1)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  if (!currentPhoto) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      onClick={(e) => {
        // Close if clicking the backdrop (not the image or buttons)
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Previous arrow — desktop only */}
      <button
        className="lightbox-arrow lightbox-arrow--prev"
        onClick={() => onNavigate(-1)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      {/* Image container */}
      <div
        className="lightbox-image-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.imageUrl}
          alt={currentPhoto.title}
          className="lightbox-image"
          draggable={false}
        />
      </div>

      {/* Next arrow — desktop only */}
      <button
        className="lightbox-arrow lightbox-arrow--next"
        onClick={() => onNavigate(1)}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  )
}

export default Lightbox
