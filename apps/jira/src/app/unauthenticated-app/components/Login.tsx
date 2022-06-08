import { FC } from 'react'

import { AuthForm } from '@sarair/shared/context'
import { useAuth } from '../../../hooks/useAuth'

import { Form, Input } from 'antd'
import { LongButton } from '../index'

interface LoginProps {
    onError: (error: Error) => void
}

export const Login: FC<LoginProps> = ({ onError }) => {
    const {
        user,
        methods: { login }
    } = useAuth()

    const handleSubmit = (values: AuthForm) => {
        login(values).catch(onError)
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
                <Input type="password" placeholder={'密码'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>
                    登录
                </LongButton>
            </Form.Item>
        </Form>
    )
}
