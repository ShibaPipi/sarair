import { FC, useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'

import { useProjectDrawer } from '../../../hooks/projects'

import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox } from '@sarair/desktop/shared/ui'
import { DrawerContainer } from '../../../components'
import { UserSelector } from '../../../features/user-selector'

export const ProjectDrawer: FC = () => {
    const {
        visible,
        isLoading,
        isMutateLoading,
        detail,
        isEditing,
        error,
        methods: { close, create, update }
    } = useProjectDrawer()

    const [form] = Form.useForm()
    const handleDrawerClose = useMemoizedFn(() => {
        form.resetFields()
        close()
    })
    const onFinish = useMemoizedFn(formData => {
        ;(isEditing ? update : create)(formData).then(() => {
            form.resetFields()
            handleDrawerClose()
        })
    })
    useEffect(() => {
        isEditing && form.setFieldsValue(detail)
    }, [detail, form, isEditing])

    return (
        <Drawer
            width="100%"
            visible={visible}
            onClose={handleDrawerClose}
            forceRender
        >
            <DrawerContainer>
                <Spin size="large" spinning={isLoading}>
                    <h1>{isEditing ? '编辑项目' : '创建项目'}</h1>
                    <ErrorBox error={error} />
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ width: '40rem' }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入项目名称'
                                }
                            ]}
                        >
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                        <Form.Item
                            label="部门"
                            name="organization"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入部门名称'
                                }
                            ]}
                        >
                            <Input placeholder="请输入部门名称" />
                        </Form.Item>
                        <Form.Item label="负责人" name="personId">
                            <UserSelector defaultOptionLabel="负责人" />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button
                                loading={isMutateLoading}
                                type="primary"
                                htmlType="submit"
                            >
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </DrawerContainer>
        </Drawer>
    )
}
