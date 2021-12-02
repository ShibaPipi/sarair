import React from 'react'

import { AuthForm, useAuth } from '@sarair/shared/context'

import { Form, Input } from '@sarair/desktop/shared/ui'
import { LongButton } from '../index'

interface RegisterProps {
    onError: (error: Error) => void
}

export const Register: React.FC<RegisterProps> = ({ onError }) => {
    const {
        methods: { register }
    } = useAuth()

    const handleSubmit = (values: AuthForm) => {
        register(values).catch(onError)
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
                <LongButton htmlType={'submit'} type={'primary'}>
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}
