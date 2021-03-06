import React from 'react'

import { Form, Input } from 'antd'
import { UserSelector } from '../../../features'

import type { Param } from '../../../types'

interface SearchPanelProps {
    param: Partial<Param>
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
    param,
    setParam
}) => {
    return (
        <Form layout="inline" style={{ marginBottom: '2rem' }}>
            <Form.Item>
                <Input
                    onChange={e => setParam({ name: e.target.value })}
                    value={param.name}
                    placeholder="项目名"
                />
            </Form.Item>
            <Form.Item>
                <UserSelector
                    defaultOptionLabel="负责人"
                    value={param.personId}
                    onChange={value => {
                        setParam({ personId: value })
                    }}
                />
            </Form.Item>
        </Form>
    )
}
