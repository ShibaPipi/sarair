import React from 'react'

import { AuthForm, useAuth } from '@sarair/shared/context'

import { Form, Input } from '@sarair/shared/ui'
import { LongButton } from '../index'

export const Login: React.FC = () => {
  const {
    user,
    methods: { login }
  } = useAuth()

  const handleSubmit = (values: AuthForm) => {
    login(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，用户名：{user?.name}</div> : null}
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
