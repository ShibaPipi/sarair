import React, { useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'

import { DataList } from './components/DataList'
import { useKeepers } from '../hooks/useKeepers'

import { Button, PageHeader, Select } from '@sarair/shared/ui'
import { Charts } from './components/Charts'

const App: React.FC = () => {
  const { data: list, isLoading } = useKeepers()

  const [current, setCurrent] = useState('Cherry')

  const data = useMemo(
    () => list?.filter((d) => d.name === current),
    [current, list]
  )

  const handleAddData = useCallback(() => {}, [])

  return (
    <PageWrapper>
      <PageHeader
        title="Keeper 身体数据记录表"
        extra={[
          <Select
            key="select"
            style={{ width: '6.4rem' }}
            defaultValue={'Cherry'}
            onChange={setCurrent}
          >
            <Select.Option value={'Cherry'}>Cherry</Select.Option>
            <Select.Option value={'Pdrol'}>Pdrol</Select.Option>
          </Select>,
          <Button key="add-button" type="primary" onClick={handleAddData}>
            增加一条数据
          </Button>
        ]}
      >
        <DataList dataSource={data || []} loading={isLoading} />
        {data && <Charts loading={isLoading} data={data} />}
      </PageHeader>
    </PageWrapper>
  )
}

export default App

const PageWrapper = styled.div`
  padding: 2.4rem;
  background-color: #f5f5f5;
`
