import { NavLink, Outlet } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import './AdminLayout.css'

const AdminLayout = () => {
  const { unreadCount, errorMessage, successMessage } = useData()

  return (
    <div className="admin-layout">

      {/* ===== HEADER ===== */}
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          Manage your portfolio and client inquiries.
        </p>
      </div>

      {/* ===== TABS ===== */}
      <nav className="admin-tabs">
        <NavLink
          to="/admin/dashboard/photos"
          className={({ isActive }) =>
            `admin-tab ${isActive ? 'admin-tab--active' : ''}`
          }
        >
          Manage Photos
        </NavLink>

        <NavLink
          to="/admin/dashboard/requests"
          className={({ isActive }) =>
            `admin-tab ${isActive ? 'admin-tab--active' : ''}`
          }
        >
          Contact Requests
          {unreadCount > 0 && (
            <span className="admin-tab-count">{unreadCount}</span>
          )}
        </NavLink>
      </nav>

      {/* ===== MESSAGES ===== */}
      {errorMessage && (
        <div className="admin-message admin-message--error">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="admin-message admin-message--success">
          {successMessage}
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  )
}

export default AdminLayout
