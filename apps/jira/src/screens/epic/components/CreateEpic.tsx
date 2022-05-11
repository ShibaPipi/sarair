import { FC } from 'react'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useEpicCreate } from '../../../hooks/epics'
import { useProjectIdInRouteParams } from '../../../hooks/projects'

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
import { DrawerContainer } from '../../../components'

import type { DrawerProps } from '@sarair/desktop/shared/ui'
import type { Epic } from '../../../types'

interface CreateEpicProps {
    visible: DrawerProps['visible']
    onClose: () => void
}

export const CreateEpic: FC<CreateEpicProps> = ({ visible, onClose }) => {
    const projectId = useProjectIdInRouteParams()
    const {
        isLoading,
        error,
        methods: { create }
    } = useEpicCreate()

    const [form] = useForm()
    const onFinish = useMemoizedFn(async (values: Partial<Epic>) => {
        await create({
            ...values,
            projectId,
            startTime: new Date().getTime(),
            endTime: new Date().getTime()
        })
        form.resetFields()
        onClose()
    })

    return (
        <Drawer
            forceRender
            destroyOnClose
            width="100%"
            visible={visible}
            onClose={onClose}
        >
            <DrawerContainer>
                <Spin size="large" spinning={isLoading}>
                    <h1>创建任务组</h1>
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
                                    message: '请输入任务组名称'
                                }
                            ]}
                        >
                            <Input placeholder="请输入任务组名称" />
                        </FormItem>
                        <FormItem style={{ textAlign: 'center' }}>
                            <Button
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                            >
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </DrawerContainer>
        </Drawer>
    )
}
