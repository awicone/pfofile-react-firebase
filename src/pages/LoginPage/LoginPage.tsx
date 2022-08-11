import React from 'react'
import s from './LoginPage.module.scss'
import LoginForm from '@/components/LoginForm/LoginForm'

function LoginPage() {
  return (
    <div className={s.dashboardContainer}>
      {Array(15).fill((<div className={s.firefly} />))}
      <LoginForm />
    </div>
  )
}

export default LoginPage
