import { FC, useEffect } from 'react'
import styled from '@emotion/styled'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useProjectDrawer } from '../../../hooks/projects'

import {
    Button,
    Drawer,
    ErrorBox,
    Form,
    FormItem,
    Input,
    Spin,
    useForm
} from '@sarair/desktop/shared/ui'
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

    const [form] = useForm()
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
            <Container>
                <Spin size="large" spinning={isLoading}>
                    <h1>{isEditing ? '编辑项目' : '创建项目'}</h1>
                    <ErrorBox error={error} />
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ width: '40rem' }}
                        onFinish={onFinish}
                    >
                        <FormItem
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
                        </FormItem>
                        <FormItem
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
                        </FormItem>
                        <FormItem label="负责人" name="personId">
                            <UserSelector defaultOptionLabel="负责人" />
                        </FormItem>
                        <FormItem style={{ textAlign: 'center' }}>
                            <Button
                                loading={isMutateLoading}
                                type="primary"
                                htmlType="submit"
                            >
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
