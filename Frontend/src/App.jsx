import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Gallery from './components/Gallery'
import ContactForm from './components/ContactForm'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import Home from './components/Home'
import About from './components/About'
import ProtectedRoute from './components/ProtectedRoute'

const photos = [
  {
    id: 1,
    title: "Mountain Sunset",
    category: "nature",
    imageUrl: "https://picsum.photos/id/10/400/300",
    description: "Beautiful sunset over the mountains"
  },
  {
    id: 2,
    title: "Wedding Kiss",
    category: "weddings",
    imageUrl: "https://picsum.photos/id/26/400/300",
    description: "A romantic moment captured"
  },
  {
    id: 3,
    title: "Portrait in Black & White",
    category: "portraits",
    imageUrl: "https://picsum.photos/id/91/400/300",
    description: "Stunning portrait photography"
  },
  {
    id: 4,
    title: "Forest Path",
    category: "nature",
    imageUrl: "https://picsum.photos/id/15/400/300",
    description: "A peaceful walk through the woods"
  },
  {
    id: 5,
    title: "Beach Wedding",
    category: "weddings",
    imageUrl: "https://picsum.photos/id/25/400/300",
    description: "A couple saying their vows by the sea"
  },
  {
    id: 6,
    title: "Elegant Portrait",
    category: "portraits",
    imageUrl: "https://picsum.photos/id/64/400/300",
    description: "An elegant portrait session"
  },
  // New commercial photos
  {
    id: 7,
    title: "Corporate Headshot Session",
    category: "commercials",
    imageUrl: "https://picsum.photos/id/1/400/300",
    description: "Professional headshots for corporate clients"
  },
  {
    id: 8,
    title: "Product Photography - Watches",
    category: "commercials",
    imageUrl: "https://picsum.photos/id/21/400/300",
    description: "High-end product photography for luxury watches"
  },
  {
    id: 9,
    title: "Office Environment Shoot",
    category: "commercials",
    imageUrl: "https://picsum.photos/id/24/400/300",
    description: "Modern office spaces for company branding"
  }
]

const App = () => {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery photos={photos} />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard photos={photos} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
