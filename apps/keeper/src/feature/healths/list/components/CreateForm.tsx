import { FC, useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { pluck } from 'ramda'

import { useHealthList } from '../../../../hooks'
import { healthFieldsMap } from '../../../../models/health'

import { Col, DatePicker, Form, InputNumber, Modal, Row } from 'antd'

import type { InputNumberProps } from 'antd'
import type { HealthFormData } from '../../../../models/health'

enum FormItemEnum {
    INT = 'int',
    FLOAT = 'float',
    DATE = 'date'
}

const formFields: Array<{
    label: string
    name: string
    type: FormItemEnum
    extraInputNumberProps: Partial<InputNumberProps>
}> = [
    { name: 'date', type: FormItemEnum.DATE },
    {
        name: 'weight',
        type: FormItemEnum.FLOAT
    },
    { name: 'score', type: FormItemEnum.INT },
    { name: 'bmi', type: FormItemEnum.FLOAT },
    {
        name: 'bodyFatRate',
        type: FormItemEnum.FLOAT
    },
    { name: 'bodyAge', type: FormItemEnum.INT },
    {
        name: 'muscle',
        type: FormItemEnum.FLOAT
    },
    {
        name: 'boneMass',
        type: FormItemEnum.FLOAT
    },
    {
        name: 'water',
        type: FormItemEnum.FLOAT
    },
    { name: 'visceralFat', type: FormItemEnum.INT },
    { name: 'bmr', type: FormItemEnum.INT },
    {
        name: 'protein',
        type: FormItemEnum.FLOAT
    },
    {
        name: 'subcutaneousFat',
        type: FormItemEnum.FLOAT
    },
    {
        name: 'weightWithoutFat',
        type: FormItemEnum.FLOAT
    },
    {
        name: 'skeletalMuscleRate',
        type: FormItemEnum.FLOAT
    }
].map(item => ({
    ...item,
    label: healthFieldsMap[item.name].name,
    extraInputNumberProps: { addonAfter: healthFieldsMap[item.name].unit }
}))

const formItemProps = { style: { width: 180 } }
const inputNumberProps: InputNumberProps = { min: 0 }
const renderFormItem = (
    type: FormItemEnum,
    extraInputNumberProps?: Partial<InputNumberProps>
) => {
    switch (type) {
        case FormItemEnum.INT:
            return (
                <InputNumber
                    {...formItemProps}
                    {...inputNumberProps}
                    {...extraInputNumberProps}
                />
            )
        case FormItemEnum.FLOAT:
            return (
                <InputNumber
                    {...formItemProps}
                    {...inputNumberProps}
                    {...extraInputNumberProps}
                    precision={1}
                    step={0.1}
                />
            )
        case FormItemEnum.DATE:
            return
        default:
            return null
    }
}

interface CreateFormProps {
    name: string
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const CreateForm: FC<CreateFormProps> = ({
    name,
    visible,
    setVisible
}) => {
    const {
        list,
        isCreateLoading,
        methods: { create }
    } = useHealthList({ name })

    const now = useMemo(() => new Date(), [])
    const recordedDates = useMemo(() => pluck('date', list), [list])

    const [form] = Form.useForm<Omit<HealthFormData, 'name'>>()

    const handleAddData = useMemoizedFn(() => {
        form.validateFields().then(values => {
            const formData = {
                ...values,
                name,
                date: dayjs(values.date).format('YYYY-MM-DD')
            }
            create(formData)
            setVisible(false)
            form.resetFields()
        })
    })

    return (
        <Modal
            title={`给 ${name} 新增数据`}
            visible={visible}
            onOk={handleAddData}
            width={1080}
            okText="确定"
            confirmLoading={isCreateLoading}
            onCancel={() => setVisible(false)}
            cancelText="取消"
        >
            <Form form={form} labelCol={{ span: 8 }}>
                <Row>
                    {formFields.map(
                        ({ label, name, type, extraInputNumberProps }) => (
                            <Col key={name} span={8}>
                                <Form.Item
                                    key={name}
                                    label={label}
                                    name={name}
                                    rules={[
                                        {
                                            required: true,
                                            message: `请填写${label}`
                                        }
                                    ]}
                                >
                                    {[
                                        FormItemEnum.INT,
                                        FormItemEnum.FLOAT
                                    ].includes(type) ? (
                                        renderFormItem(
                                            type,
                                            extraInputNumberProps
                                        )
                                    ) : (
                                        <DatePicker
                                            disabledDate={date =>
                                                recordedDates.includes(
                                                    date.format('YYYY-MM-DD')
                                                ) ||
                                                date > dayjs(now).add(1, 'd')
                                            }
                                            {...formItemProps}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        )
                    )}
                </Row>
            </Form>
        </Modal>
    )
}
