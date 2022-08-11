import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Index from '@/pages/Dashboard/Dashboard'
import LoginPage from '@/pages/LoginPage/LoginPage'
import { useSelector } from 'react-redux'
import { Store } from '@/types/Store'
import routes from '../Router/routes'

export const AppRoutes = () => {
  const { email } = useSelector((state: Store) => state.user);

  return (
    <Routes>
      {!!email && <Route path={routes.dashboard} element={<Index />} />}
      <Route path={routes.login} element={<LoginPage />} />
      <Route
        path="*"
        element={<Navigate to={routes.login} replace />}
      />
    </Routes>
  )
}
