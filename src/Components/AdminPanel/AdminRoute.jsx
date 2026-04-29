
import React from 'react'
import { Navigate } from 'react-router-dom'
import { isEmailAllowed } from '../../config/adminConfig'

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!user || !isEmailAllowed(user.email)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute

