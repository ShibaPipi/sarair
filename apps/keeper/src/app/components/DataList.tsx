import React from 'react'
import dayjs from 'dayjs'

import { Table } from '@sarair/shared/ui'

import type { ColumnProps, TableProps } from '@sarair/shared/ui'
import type { HealthItem } from '../../types/health'

type DataListProps = TableProps<HealthItem>

export const DataList: React.FC<DataListProps> = ({ ...tableProps }) => {
    const columns: ColumnProps<HealthItem>[] = [
        {
            title: '日期',
            dataIndex: 'created',
            fixed: 'left',
            width: '10%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.created - b.created,
            render: (created) => dayjs(created).format('YYYY-MM-DD')
        },
        {
            title: '体重',
            dataIndex: 'weight',
            fixed: 'left'
        },
        {
            title: 'BMI',
            dataIndex: 'bmi',
            fixed: 'left'
        },
        {
            title: '体脂率',
            dataIndex: 'bodyFatRate',
            fixed: 'left'
        },
        {
            title: '身体年龄',
            dataIndex: 'bodyAge'
        },
        {
            title: '肌肉',
            dataIndex: 'muscle'
        },
        {
            title: '骨量',
            dataIndex: 'boneMass'
        },
        {
            title: '水分',
            dataIndex: 'water'
        },
        {
            title: '内脏脂肪',
            dataIndex: 'visceralFat'
        },
        {
            title: '基础代谢',
            dataIndex: 'bmr'
        },
        {
            title: '蛋白质',
            dataIndex: 'protein'
        },
        {
            title: '皮下脂肪',
            dataIndex: 'subcutaneousFat'
        },
        {
            title: '去脂体重',
            dataIndex: 'weightWithoutFat'
        },
        {
            title: '骨骼肌率',
            dataIndex: 'skeletalMuscleRate'
        },
        {
            title: '分数',
            dataIndex: 'score',
            fixed: 'right'
        }
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   render: (tags) => (
        //     <>
        //       {tags.map((tag: string) => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green'
        //         if (tag === 'loser') {
        //           color = 'volcano'
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         )
        //       })}
        //     </>
        //   )
        // },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   fixed: 'right',
        //   width: '10%',
        //   render: (text, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   )
        // }
    ]

    return (
        <Table
            {...tableProps}
            columns={columns}
            rowKey={(r) => r.id}
            scroll={{ x: 1300 }}
        />
    )
}
