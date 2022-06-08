import { FC, useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'

import { useTaskModal } from '../../../hooks/tasks'

import { Button, Form, Input, Modal } from 'antd'
import { TaskTypeSelector, UserSelector } from '../../../features'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const TaskModal: FC = () => {
    const {
        editingTaskId,
        detail,
        isUpdateLoading,
        methods: { close, update, remove }
    } = useTaskModal()

    const [form] = Form.useForm()

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

    const handleDelete = useMemoizedFn((id: number) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk: () => remove({ id }).then(close)
        })
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
                <Form.Item
                    label="任务名"
                    name="name"
                    rules={[{ required: true, message: '请输入任务名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="经办人" name="processorId">
                    <UserSelector defaultOptionLabel="经办人" />
                </Form.Item>
                <Form.Item label="类型" name="typeId">
                    <TaskTypeSelector defaultOptionLabel="类型" />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button
                    style={{ fontSize: 14 }}
                    size="small"
                    onClick={() => handleDelete(editingTaskId)}
                >
                    删除
                </Button>
            </div>
        </Modal>
    )
}
