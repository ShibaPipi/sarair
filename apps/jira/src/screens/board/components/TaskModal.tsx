import React, { useEffect } from 'react'

import { useMemoizedFn } from '@sarair/shared/hooks'
import { useTaskModal } from '../../../hooks/tasks'

import {
    Form,
    FormItem,
    Input,
    Modal,
    useForm
} from '@sarair/desktop/shared/ui'
import { TaskTypeSelector, UserSelector } from '../../../features'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const TaskModal: React.FC = () => {
    const {
        editingTaskId,
        detail,
        isLoading,
        isUpdateLoading,
        methods: { close, update }
    } = useTaskModal()

    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue(detail)
    }, [detail, form])

    const handleCloseModal = useMemoizedFn(() => {
        close()
        form.resetFields()
    })

    const handleSubmit = useMemoizedFn(() => {
        update(form.getFieldsValue()).then(close)
    })

    return (
        <Modal
            title="编辑任务"
            visible={!!editingTaskId}
            okText="确认"
            cancelText="取消"
            onOk={handleSubmit}
            onCancel={handleCloseModal}
            confirmLoading={isUpdateLoading}
            forceRender
        >
            <Form {...layout} form={form}>
                <FormItem
                    label="任务名"
                    name="name"
                    rules={[{ required: true, message: '请输入任务名' }]}
                >
                    <Input />
                </FormItem>
                <FormItem label="经办人" name="processorId">
                    <UserSelector defaultOptionLabel="经办人" />
                </FormItem>
                <FormItem label="类型" name="typeId">
                    <TaskTypeSelector defaultOptionLabel="类型" />
                </FormItem>
            </Form>
        </Modal>
    )
}
