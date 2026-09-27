import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import './styles/Login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard')
    }
  }, [isLoggedIn, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password.')
      }

      setSuccessMessage('Access granted. Loading studio dashboard...')
      login(data.token, data.user)

      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 1000)
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.')
      setFormData({ ...formData, password: '' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login">

      {/* Background corner marks */}
      <div className="admin-login-corners" aria-hidden="true">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      {/* Top header */}
      <header className="admin-login-header">
        <div className="admin-login-tag">
          <span className="admin-login-dot" />
          <span>Internal Studio Access</span>
        </div>
        <div className="admin-login-version">v 2.5</div>
      </header>

      {/* Card */}
      <main className="admin-login-main">
        <div className="admin-login-card">

          {/* Logo */}
          <div className="admin-login-logo">
            <Logo variant="dark" size="md" showWordmark={false} />
          </div>

          {/* Heading */}
          <div className="admin-login-heading">
            <h1>Admin Login</h1>
            <p>Sign in to manage your portfolio.</p>
          </div>

          {/* Form */}
          <form className="admin-login-form" onSubmit={handleSubmit}>

            <div className="admin-login-field">
              <label htmlFor="login-email" className="admin-login-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@mementomemories.com"
                autoComplete="email"
                required
                disabled={isLoading}
                className="admin-login-input"
              />
            </div>

            <div className="admin-login-field">
              <div className="admin-login-label-row">
                <label htmlFor="login-password" className="admin-login-label">
                  Password
                </label>
                <button
                  type="button"
                  className="admin-login-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter secure password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="admin-login-input"
              />
            </div>

            {errorMessage && (
              <div className="admin-login-message admin-login-message--error">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="admin-login-message admin-login-message--success">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="admin-login-submit-arrow">→</span>
                </>
              )}
            </button>

          </form>

          {/* Back link */}
          <div className="admin-login-back">
            <Link to="/" className="admin-login-back-link">
              <span className="admin-login-back-arrow">←</span>
              <span>Back to site</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="admin-login-footer">
        © {new Date().getFullYear()} Memento Memories · Confidential Portfolio System
      </footer>

    </div>
  )
}

export default Login
