import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './LoginForm.module.scss'
import { Button, Checkbox, Form, Input } from 'antd'
import classNames from 'classnames'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { login } from '@/store/slices/userSlice'
import { useDispatch } from 'react-redux'

interface LoginFormValuesProps {
  email: string,
  password: string
}
const LoginForm = () => {

  const [isWrongCredentials, setIsWrongCredentials] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onFinish = async (values: LoginFormValuesProps) => {
    setFetching(true)

    const auth = getAuth()
    await signInWithEmailAndPassword(auth, values.email, values.password).then(({ user }) => {
      dispatch(login({
        email: user.email,
        id: user.uid
      }))
      navigate('/dashboard')
      setFetching(false)
    }).catch(() => {
      setFetching(false)
      setIsWrongCredentials(true)
    })
  };

  const formContainerStyle = classNames({
    [s.shaking]: isWrongCredentials
  }, s.formContainer)

  return (
    <div className={formContainerStyle}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input status={isWrongCredentials ? 'error' : undefined} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password status={isWrongCredentials ? 'error' : undefined} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={fetching} type="default" htmlType="submit">
            {fetching ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
