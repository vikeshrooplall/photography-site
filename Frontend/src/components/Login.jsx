import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const TEST_CREDENTIALS = {
  email: 'user@example.com',
  password: 'Password123'
}

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      if (formData.email === TEST_CREDENTIALS.email && formData.password === TEST_CREDENTIALS.password) {
        setSuccessMessage('Login successful! Redirecting ...')
        localStorage.setItem('isLoggedIn', 'true')

        setFormData({ email: '', password: ''})

        setTimeout(() => {
          navigate('/admin/dashboard')
        }, 1500);

      } else {
        setErrorMessage('Invalid email or password, please try again.')

        setFormData({
          ...formData,
          password: ''
        })
      }
    }, 1500)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')

    setSuccessMessage('')
    setErrorMessage('')
    setFormData({ email: '', password: '' })
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

      {successMessage && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

    </div>
  )
}

export default Login
