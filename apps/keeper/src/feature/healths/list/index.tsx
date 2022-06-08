import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { useHealthList, useHealthSearchParams } from '../../../hooks'
import { KeeperEnum } from '../../../models/health'

import { Button, PageHeader, Select } from 'antd'
import { Charts } from './components/Charts'
import { CreateForm } from './components/CreateForm'
import { DataList } from './components/DataList'

const options = [KeeperEnum.PDROL, KeeperEnum.CHERRY]

export const FeatureHealthList: FC = () => {
    const [{ name }, setUrlState] = useHealthSearchParams()

    const { list, lostWeight, isLoading } = useHealthList({ name })
    const [createFormVisible, setCreateFormVisible] = useState<boolean>(false)

    return (
        <PageWrapper>
            <PageHeader
                title={`Keeper 身体数据记录表：${name}，此阶段已减重 ${
                    isLoading ? 'loading...' : lostWeight
                } kg`}
                extra={[
                    <Select
                        key="select"
                        style={{ width: '6.4rem' }}
                        defaultValue={name}
                        onChange={value => setUrlState({ name: value })}
                    >
                        {options.map(item => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>,
                    <Button
                        key="add-button"
                        type="primary"
                        onClick={() => setCreateFormVisible(true)}
                    >
                        增加一条数据
                    </Button>
                ]}
            />
            <DataList dataSource={list} loading={isLoading} />
            <Charts loading={isLoading} data={list} />
            <CreateForm
                name={name}
                visible={createFormVisible}
                setVisible={setCreateFormVisible}
            />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    padding: 2.4rem;
    background-color: #f5f5f5;
`
