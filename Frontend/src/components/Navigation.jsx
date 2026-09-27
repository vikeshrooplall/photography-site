import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Logo from './Logo'
import './styles/Navigation.css'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(true)
  const { unreadCount } = useData()
  const { isLoggedIn, user, logout } = useAuth()

  const username = user?.username || 'Admin'
  const useTransparentStyle = !isScrolled

  // IntersectionObserver — watches for the hero sentinel
  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel')

    if (!sentinel) {
      // No hero on this page → always solid
      setIsScrolled(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setIsDropDownOpen(false)
    navigate('/admin/login')
  }

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }

  const getAdminToggleLink = () => {
    if (location.pathname === '/admin/dashboard/photos') {
      return { path: '/admin/dashboard/requests', label: 'Contact Requests' }
    }

    if (location.pathname === '/admin/dashboard/requests') {
      return { path: '/admin/dashboard/photos', label: 'Manage Photos' }
    }

    return { path: '/admin/dashboard/photos', label: 'Manage Photos' }
  }

  const navClass = `navbar ${useTransparentStyle ? 'navbar--transparent' : 'navbar--solid'}`

  // ---------- NOT LOGGED IN ----------
  if (!isLoggedIn) {
    return (
      <nav className={navClass}>
        <div className="navbar-inner">
          {/* Left Links */}
          <div className="navbar-group navbar-group--left">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/gallery" className="navbar-link">Gallery</Link>
          </div>

          {/* Center — Logo */}
          <Link to="/" className="navbar-logo" aria-label="Memento Memories home">
            <Logo
              variant={useTransparentStyle ? 'light' : 'dark'}
              size="sm"
              showWordmark={false}
            />
          </Link>

          {/* Right Links */}
          <div className="navbar-group navbar-group--right">
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/admin/login" className="navbar-link navbar-link--admin">Admin</Link>
          </div>
        </div>
      </nav>
    )
  }

  // ---------- LOGGED IN (ADMIN) ----------
  const adminLink = getAdminToggleLink()

  return (
    <nav className={navClass}>
      <div className="navbar-inner">
        {/* Left Links */}
        <div className="navbar-group navbar-group--left">
          <Link to={adminLink.path} className="navbar-link">
            {adminLink.label}
            {adminLink.label === 'Contact Requests' && unreadCount > 0 && ` (${unreadCount})`}
          </Link>
          <Link to="/about" className="navbar-link">About</Link>
        </div>

        {/* Center — Logo */}
        <Link to="/admin/dashboard/photos" className="navbar-logo" aria-label="Admin dashboard">
          <Logo
            variant={useTransparentStyle ? 'light' : 'dark'}
            size="sm"
            showWordmark={false}
          />
        </Link>

        {/* Right — Admin Dropdown */}
        <div className="navbar-group navbar-group--right">
          <div className="navbar-dropdown">
            <button onClick={toggleDropDown} className="navbar-dropdown-toggle">
              {username} ▼
            </button>

            {isDropDownOpen && (
              <div className="navbar-dropdown-menu">
                <p className="navbar-dropdown-info">
                  Logged in as: <strong>{username}</strong>
                </p>
                <button onClick={handleLogout} className="navbar-dropdown-logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
