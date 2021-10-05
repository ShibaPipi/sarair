import React from 'react'

import { AuthForm, useAuth } from '@sarair/shared/context'
import { Button, Form, Input } from '@sarair/shared/ui'

export const Register: React.FC = () => {
  const {
    methods: { register }
  } = useAuth()

  const handleSubmit = (values: AuthForm) => {
    register(values)
  }
  return (
    <Form onFinish={handleSubmit}>
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
        <Button htmlType={'submit'} type={'primary'}>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
