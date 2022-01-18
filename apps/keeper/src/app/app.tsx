import React, { useMemo, useState } from 'react'
import { compose, map, pluck } from 'ramda'
import dayjs from 'dayjs'
import styled from '@emotion/styled'

import { useAntdTable, useMemoizedFn } from '@sarair/shared/hooks'
import { useKeepers } from '../hooks/useKeepers'
import { healthFieldsMap, KeeperEnum } from '../models/health'

import type { InputNumberProps } from '@sarair/desktop/shared/ui'
import type { HealthFormData } from '../models/health'

import {
    Button,
    DatePicker,
    Form,
    FormItem,
    InputNumber,
    Modal,
    PageHeader,
    Select,
    useForm
} from '@sarair/desktop/shared/ui'
import { Charts } from './components/Charts'
import { DataList } from './components/DataList'

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
    { name: 'created', type: FormItemEnum.DATE },
    {
        name: 'weight',
        type: FormItemEnum.FLOAT
    },
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
    },
    { name: 'score', type: FormItemEnum.INT }
].map(item => ({
    ...item,
    label: healthFieldsMap[item.name].name,
    extraInputNumberProps: { addonAfter: healthFieldsMap[item.name].suffix }
}))

const formItemProps = { style: { width: 160 } }
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

const App: React.FC = () => {
    // const {} = useAntdTable();
    const [currentKeeper, setCurrentKeeper] = useState<KeeperEnum>(
        KeeperEnum.PDROL
    )

    const {
        list,
        loading,
        methods: { create }
    } = useKeepers(currentKeeper)
    const recordedDates = useMemo(
        () =>
            map<number, string>(
                item => dayjs(item).format('YYYY-MM-DD'),
                pluck('created', list)
            ),
        [list]
    )

    const [form] = useForm<Omit<HealthFormData, 'name'>>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const handleAddData = useMemoizedFn(async () => {
        try {
            const values = await form.validateFields()
            const formData = {
                ...values,
                name: currentKeeper,
                created: dayjs(values.created).valueOf()
            }
            await create(formData)
            setModalVisible(false)
            form.resetFields()
        } catch (e) {
            return
        }
    })

    return (
        <PageWrapper>
            <PageHeader
                title={`Keeper 身体数据记录表：${currentKeeper}`}
                extra={[
                    <Select
                        key="select"
                        style={{ width: '6.4rem' }}
                        defaultValue={KeeperEnum.PDROL}
                        onChange={setCurrentKeeper}
                    >
                        <Select.Option value={KeeperEnum.PDROL}>
                            {KeeperEnum.PDROL}
                        </Select.Option>
                        <Select.Option value={KeeperEnum.CHERRY}>
                            {KeeperEnum.CHERRY}
                        </Select.Option>
                    </Select>,
                    <Button
                        key="add-button"
                        type="primary"
                        onClick={() => setModalVisible(true)}
                    >
                        增加一条数据
                    </Button>
                ]}
            >
                <DataList dataSource={list} loading={loading} />
                <Charts loading={loading} data={list} />
            </PageHeader>
            <Modal
                title={`给 ${currentKeeper} 新增数据`}
                visible={modalVisible}
                onOk={handleAddData}
                width={480}
                okText="确定"
                onCancel={() => setModalVisible(false)}
                cancelText="取消"
            >
                <Form form={form} labelCol={{ span: 8 }}>
                    {formFields.map(
                        ({ label, name, type, extraInputNumberProps }) => (
                            <FormItem
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
                                    renderFormItem(type, extraInputNumberProps)
                                ) : (
                                    <DatePicker
                                        disabledDate={date =>
                                            recordedDates.includes(
                                                date.format('YYYY-MM-DD')
                                            )
                                        }
                                        {...formItemProps}
                                    />
                                )}
                            </FormItem>
                        )
                    )}
                </Form>
            </Modal>
        </PageWrapper>
    )
}

export default App

const PageWrapper = styled.div`
    padding: 2.4rem;
    background-color: #f5f5f5;
`
