import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Gallery from './components/Gallery'
import ContactForm from './components/ContactForm'
import Login from './components/Login'
import Home from './components/Home'
import About from './components/About'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import PhotoManager from './components/admin/PhotoManager'
import ContactManager from './components/admin/ContactManager'

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
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="photos" replace />} />
          <Route path="photos" element={<PhotoManager />} />
          <Route path="requests" element={<ContactManager />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
