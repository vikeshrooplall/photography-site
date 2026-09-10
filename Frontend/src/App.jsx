import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Gallery from './components/Gallery'
import ContactForm from './components/ContactForm'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import Home from './components/Home'
import About from './components/About'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
