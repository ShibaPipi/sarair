import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useMemoizedFn } from 'ahooks'

import { Dropdown, Menu, Modal, Table } from 'antd'
import { ButtonNoPadding, Pin } from '@sarair/desktop/shared/ui'

import type { TableColumnProps, TableProps } from 'antd'
import type { User } from '@sarair/shared/context'
import type { Project } from '../../../types'

interface ListProps extends TableProps<Project> {
    users: User[]
    onPinChange: (params: Partial<Project>) => void
    showEdit: (id: number) => void
    remove: ({ id }: { id: number }) => Promise<unknown>
}

export const List: FC<ListProps> = ({
    users,
    onPinChange,
    showEdit,
    remove,
    ...tableProps
}) => {
    const handleRemoveItem = useMemoizedFn((id: number) => {
        Modal.confirm({
            title: '确定删除这个项目吗？',
            content: '点击确定删除',
            okText: '确定',
            onOk: () => remove({ id }),
            cancelText: '删除'
        })
    })

    const columns: TableColumnProps<Project>[] = [
        {
            title: <Pin checked={true} disabled />,
            render: (_, { id, pin }) => (
                <Pin
                    checked={pin}
                    onCheckedChange={(pin) => onPinChange({ id, pin })}
                />
            )
        },
        {
            title: '名称',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
            render: (_, { id, name }) => (
                <Link to={`/projects/${id}`}>{name}</Link>
            )
        },
        {
            title: '部门',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            dataIndex: 'personId',
            render: (personId) => (
                <span>
                    {users.find((user) => user.id === personId)?.name || '未知'}
                </span>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            render: (created) =>
                created ? dayjs(created).format('YYYY-MM-DD') : '无'
        },
        {
            dataIndex: 'id',
            render: (id) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="edit">
                                <ButtonNoPadding
                                    type="link"
                                    onClick={() => showEdit(id)}
                                >
                                    编辑
                                </ButtonNoPadding>
                            </Menu.Item>
                            <Menu.Item key="delete">
                                <ButtonNoPadding
                                    type="link"
                                    onClick={() => handleRemoveItem(id)}
                                >
                                    删除
                                </ButtonNoPadding>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <ButtonNoPadding type="link">...</ButtonNoPadding>
                </Dropdown>
            )
        }
    ]

    return (
        <Table
            {...tableProps}
            columns={columns}
            pagination={false}
            rowKey={(r) => r.id}
        />
    )
}
