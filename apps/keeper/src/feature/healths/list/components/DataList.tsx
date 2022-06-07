import { FC } from 'react'
import dayjs from 'dayjs'

import { healthFieldsMap, tips } from '../../../../models'

import { Table } from 'antd'
import { Cell } from './Cell'
import { ColumnTitle } from './ColumnTitle'

import type { TableColumnProps, TableProps } from 'antd'
import type { Health } from '../../../../models'

type DataListProps = TableProps<Health>

export const DataList: FC<DataListProps> = ({ ...tableProps }) => {
    const columns: TableColumnProps<Health>[] = [
        {
            title: '日期',
            dataIndex: 'date',
            width: 140,
            fixed: 'left',
            defaultSortOrder: 'descend',
            sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
        },
        {
            title: '体重',
            dataIndex: 'weight',
            width: 100,
            fixed: 'left',
            render: val => `${val}${healthFieldsMap['weight'].unit}`
        },
        {
            title: (
                <ColumnTitle text="BMI" tipDescription={tips.bmi.description} />
            ),
            dataIndex: 'bmi',
            width: 100,
            fixed: 'left',
            render: val => <Cell tipKey="bmi" value={val} />
        },
        {
            title: (
                <ColumnTitle
                    text="体脂率"
                    tipDescription={tips.bodyFatRate.description}
                />
            ),
            dataIndex: 'bodyFatRate',
            width: 120,
            fixed: 'left',
            render: val => <Cell tipKey="bodyFatRate" value={val} />
        },
        {
            title: (
                <ColumnTitle
                    text="身体年龄"
                    tipDescription={tips.bodyAge.description}
                />
            ),
            dataIndex: 'bodyAge',
            width: 120,
            render: val => <Cell tipKey="bodyAge" value={val} />
        },
        {
            title: (
                <ColumnTitle
                    text="肌肉"
                    tipDescription={tips.muscle.description}
                />
            ),
            dataIndex: 'muscle',
            width: 100,
            render: val => <Cell tipKey="muscle" value={val} />
        },
        {
            title: (
                <ColumnTitle
                    text="骨量"
                    tipDescription={tips.boneMass.description}
                />
            ),
            dataIndex: 'boneMass',
            width: 100,
            render: val => <Cell tipKey="boneMass" value={val} />
        },
        {
            title: (
                <ColumnTitle
                    text="水分"
                    tipDescription={tips.water.description}
                />
            ),
            dataIndex: 'water',
            width: 100,
            render: val => `${val}${healthFieldsMap['water'].unit}`
        },
        {
            title: (
                <ColumnTitle
                    text="内脏脂肪"
                    tipDescription={tips.visceralFat.description}
                />
            ),
            dataIndex: 'visceralFat',
            width: 120
        },
        {
            title: (
                <ColumnTitle
                    text="基础代谢"
                    tipDescription={tips.bmr.description}
                />
            ),
            dataIndex: 'bmr',
            width: 120
        },
        {
            title: (
                <ColumnTitle
                    text="蛋白质"
                    tipDescription={tips.protein.description}
                />
            ),
            dataIndex: 'protein',
            width: 100,
            render: val => `${val}${healthFieldsMap['protein'].unit}`
        },
        {
            title: (
                <ColumnTitle
                    text="皮下脂肪"
                    tipDescription={tips.subcutaneousFat.description}
                />
            ),
            dataIndex: 'subcutaneousFat',
            width: 120,
            render: val => `${val}${healthFieldsMap['subcutaneousFat'].unit}`
        },
        {
            title: (
                <ColumnTitle
                    text="去脂体重"
                    tipDescription={tips.weightWithoutFat.description}
                />
            ),
            dataIndex: 'weightWithoutFat',
            width: 120,
            render: val => `${val}${healthFieldsMap['weightWithoutFat'].unit}`
        },
        {
            title: (
                <ColumnTitle
                    text="骨骼肌率"
                    tipDescription={tips.skeletalMuscleRate.description}
                />
            ),
            dataIndex: 'skeletalMuscleRate',
            width: 120,
            render: val => `${val}${healthFieldsMap['skeletalMuscleRate'].unit}`
        },
        {
            title: '分数',
            dataIndex: 'score',
            width: 80,
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
