import { Link } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: 'contact', label: 'Contact' },
  { path: '/about', label: 'About' },
  { path:'admin/login', label: 'Admin' }
]

const Navigation = () => (
  <nav>
    {navItems.map(item => (
      <div key={item.path}>
        <Link to={item.path}>{item.label}</Link>
      </div>
    ))}
  </nav>
)

export default Navigation
