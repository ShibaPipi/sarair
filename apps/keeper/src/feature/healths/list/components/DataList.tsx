import React from 'react'
import dayjs from 'dayjs'

import { healthFieldsMap } from '../../models/health'

import type { ColumnProps, TableProps } from '@sarair/desktop/shared/ui'
import type { Health } from '../../models/health'

import { Table } from '@sarair/desktop/shared/ui'

type DataListProps = TableProps<Health>

enum ColorEnum {
    LOW = '#faad14',
    NORMAL = '#52c41a',
    HIGH = '#fa541c',
    TOO_HIGH = '#f5222d'
}

const tips: Record<
    keyof Omit<Health, 'id' | 'name' | 'created' | 'weight' | 'score'>,
    {
        description: string
        getColor?: (val: number) => [string, string] | ''
    }
> = {
    bmi: {
        description:
            'BMI（Body Mass Index）即人体健康指数，是国际组织衡量人体胖瘦程以及是否健康的指标，BMI 不直接测量身体脂肪含量，但研究表明其与人体脂肪含量具有相关性。',
        getColor: (val: number) => {
            if (val < 18.5) return [ColorEnum.LOW, '偏瘦']
            if (val > 23.9 || val < 27.9) return [ColorEnum.HIGH, '偏胖']
            if (val >= 27.9) return [ColorEnum.TOO_HIGH, '肥胖']
            return [ColorEnum.NORMAL, '标准']
        }
    },
    bodyFatRate: {
        description:
            '体脂率是指人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数。身体水分的丢失，也会造成体重下降，体脂率的升高，所以短期内体脂率的大幅波动，多因体重变化导致。',
        getColor: (val: number) => {
            return ''
        }
    },
    bodyAge: {
        description:
            '身体年龄是以基础代谢率为参考而研究出的身体年龄倾向，是综合评价身体状况的重要标准，',
        getColor: (val: number) => {
            return ''
        }
    },
    muscle: {
        description:
            '肌肉量是指肌肉在身体成分中所占的重量，肌肉量与体质、年龄、运动量等多种因素有关。',
        getColor: (val: number) => {
            return ''
        }
    },
    boneMass: {
        description:
            '骨量是指单位体积内骨组织，骨矿物质（钙、磷等）和骨基质（骨胶原、蛋白质、无机盐等等）含量。体脂秤是利用生物电阻抗，通过对身体成分的推算而算得的骨量值，仅作参考，不作临床诊断使用。',
        getColor: (val: number) => {
            return ''
        }
    },
    water: {
        description:
            '水分率是体内液体总量占体重的百分比，水分在体内担负着调节体温、搬运营养物质和代谢废物、调节体内环境的重任。保持健康的水分比例能够确保身体功能高效，并降低发生相关健康问题的风险。',
        getColor: (val: number) => {
            return ''
        }
    },
    visceralFat: {
        description:
            '内脏脂肪是指围绕在内脏器官周围的脂肪，对内脏器官起到保护作用。但当内脏脂肪过多时，会造成腹型肥胖，增加脂肪肝、糖尿病、高血压等疾病的发病风险。',
        getColor: (val: number) => {
            return ''
        }
    },
    bmr: {
        description:
            '基础代谢指人体在安静和恒温条件下，禁食12小时后，静卧、放松而又清醒时的能量消耗。体脂秤所测得的基础代谢是根据身体成分对基础代谢的一个推算值，仅做参考。',
        getColor: (val: number) => {
            return ''
        }
    },
    protein: {
        description:
            '蛋白质率是指身体内的蛋白质水平标准。体脂秤所测得的蛋白质率是根据身体成分对此的一个推算值，仅做参考。',
        getColor: (val: number) => {
            return ''
        }
    },
    subcutaneousFat: {
        description:
            '通过测量皮下脂肪的厚度，不仅可以判断人体的胖瘦情况，还可以用所测的皮脂厚度推测全身脂肪的重量，评价人体组成的比例。',
        getColor: (val: number) => {
            return ''
        }
    },
    weightWithoutFat: {
        description:
            '去脂体重又称瘦体重，是指除脂肪以外身体其他成分的重量，肌肉是其中的主要部分。去脂体重高说明身体强壮体质好，如运动员或一些平时就注重锻炼身体的人，他们肌肉强健，虽然体重高但却并不肥胖'
    },
    skeletalMuscleRate: {
        description: '人体有多个肌肉组织，其中骨骼肌是通过锻炼增加的肌肉。',
        getColor: (val: number) => {
            return ''
        }
    }
}

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
