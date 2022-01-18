import React from 'react'
import dayjs from 'dayjs'

import { healthFieldsMap } from '../../models/health'

import type { ColumnProps, TableProps } from '@sarair/desktop/shared/ui'
import type { Health } from '../../models/health'

import { Table } from '@sarair/desktop/shared/ui'

type DataListProps = TableProps<Health>

export const DataList: React.FC<DataListProps> = ({ ...tableProps }) => {
    const columns: ColumnProps<Health>[] = [
        {
            title: '日期',
            dataIndex: 'created',
            fixed: 'left',
            width: '10%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.created - b.created,
            render: created => dayjs(created).format('YYYY-MM-DD')
        },
        {
            title: '体重',
            dataIndex: 'weight',
            fixed: 'left',
            render: val => `${val}${healthFieldsMap['weight'].suffix}`
        },
        {
            title: 'BMI',
            dataIndex: 'bmi',
            fixed: 'left'
        },
        {
            title: '体脂率',
            dataIndex: 'bodyFatRate',
            fixed: 'left',
            render: val => `${val}${healthFieldsMap['bodyFatRate'].suffix}`
        },
        {
            title: '身体年龄',
            dataIndex: 'bodyAge'
        },
        {
            title: '肌肉',
            dataIndex: 'muscle',
            render: val => `${val}${healthFieldsMap['muscle'].suffix}`
        },
        {
            title: '骨量',
            dataIndex: 'boneMass',
            render: val => `${val}${healthFieldsMap['boneMass'].suffix}`
        },
        {
            title: '水分',
            dataIndex: 'water',
            render: val => `${val}${healthFieldsMap['water'].suffix}`
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
            dataIndex: 'protein',
            render: val => `${val}${healthFieldsMap['protein'].suffix}`
        },
        {
            title: '皮下脂肪',
            dataIndex: 'subcutaneousFat',
            render: val => `${val}${healthFieldsMap['subcutaneousFat'].suffix}`
        },
        {
            title: '去脂体重',
            dataIndex: 'weightWithoutFat',
            render: val => `${val}${healthFieldsMap['weightWithoutFat'].suffix}`
        },
        {
            title: '骨骼肌率',
            dataIndex: 'skeletalMuscleRate',
            render: val =>
                `${val}${healthFieldsMap['skeletalMuscleRate'].suffix}`
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
            rowKey="id"
            scroll={{ x: 1300 }}
        />
    )
}
