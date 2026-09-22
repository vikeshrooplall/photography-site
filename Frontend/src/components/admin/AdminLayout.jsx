import { Outlet } from 'react-router-dom'
import { useData } from '../../context/DataContext'

const AdminLayout = () => {
  const { errorMessage, successMessage } = useData()

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>
      )}

      {successMessage && (
        <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>
      )}

      <Outlet />
    </div>
  )
}

export default AdminLayout
