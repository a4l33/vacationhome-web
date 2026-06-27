import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Archive from './pages/Archive/Archive'
import Detail from './pages/Detail/Detail'
import AddApartment from './pages/AddApartment/AddApartment'
import Login from './pages/Login/Login'
import Bookings from './pages/Bookings/Bookings'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Archive /></ProtectedRoute>} />
        <Route path="/apartment/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddApartment /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App