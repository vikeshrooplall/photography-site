import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const { unreadCount } = useData()

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const username = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).username
    : 'Admin'

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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

  if (!isLoggedIn) {
    return (
      <nav style={{ display: 'flex', gap: '15px', padding: '15px', backgroundColor: '#f8f9fa' }}>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/admin/login">Admin</Link>
      </nav>
    )
  }

  const adminLink = getAdminToggleLink()

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', backgroundColor: '#f8f9fa', alignItems: 'center' }}>
      <Link to={adminLink.path}>
        {adminLink.label}
        {adminLink.label === 'Contact Requests' && unreadCount > 0 && ` (${unreadCount})`}
      </Link>
      <Link to="/about">About</Link>

      <div style={{ position: 'relative', marginLeft: 'auto' }}>
        <button
          onClick={toggleDropDown}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #ccc',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {username} ▼
        </button>

        {isDropDownOpen && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              minWidth: '180px',
              padding: '10px',
              zIndex: 1000
            }}
          >
            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>
              Logged in as: <strong>{username}</strong>
            </p>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
