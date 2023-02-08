import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavBarMenu from '../layout/NavBarMenu'


const ProtectedRoute = () => {
  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
  if (authLoading) {
    return <div className='spinner-container'>
      <Spinner variant='info' animation='border' />
    </div>
  }
  return (
    isAuthenticated ? <>
      <NavBarMenu />
      <Outlet />
    </> : <Navigate to='/login' />
  )
}

export default ProtectedRoute