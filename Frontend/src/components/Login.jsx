import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    return isLoggedIn === 'true' ? 'Welcome back Vashish' : ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials')
      }

      setSuccessMessage('Login successful! Redirecting ...')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('token', data.token)

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      setFormData({ email: '', password: '' })

      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please try again.')
      setFormData({
        ...formData,
        password: ''
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setSuccessMessage('')
    setErrorMessage('')
    setFormData({ email: '', password: '' })
    navigate('/admin/login')
  }

  if (successMessage === 'Welcome back Vashish') {
    return (
      <div>
        <h2>{successMessage}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <p>Hello Vashish, Please enter your details to sign in</p>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Please enter your password!"
            required
            disabled={isLoading}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>

      </form>
    </div>
  )
}

export default Login
