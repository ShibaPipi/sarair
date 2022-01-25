export enum KeeperEnum {
    PDROL = 'Pdrol',
    CHERRY = 'Cherry'
}

interface BaseHealth {
    name: string
    created: number
    weight: number
    bmi: number
    bodyFatRate: number
    bodyAge: number
    muscle: number
    boneMass: number
    water: number
    visceralFat: number
    bmr: number
    protein: number
    subcutaneousFat: number
    weightWithoutFat: number
    skeletalMuscleRate: number
    score: number
}

export type HealthFormData = BaseHealth

export interface Health extends BaseHealth {
    id: string
}

export type HealthFieldForCharts = keyof Pick<
    Health,
    | 'weight'
    | 'bmi'
    | 'bodyFatRate'
    | 'muscle'
    | 'water'
    | 'protein'
    | 'subcutaneousFat'
    | 'weightWithoutFat'
    | 'skeletalMuscleRate'
>

interface HealthFieldItem {
    key: string
    name: string
    suffix?: string
}

const healthFields: HealthFieldItem[] = [
    { key: 'created', name: '日期' },
    { key: 'weight', name: '体重', suffix: 'kg' },
    { key: 'score', name: '分数' },
    { key: 'bmi', name: 'BMI' },
    { key: 'bodyFatRate', name: '体脂率', suffix: '%' },
    { key: 'bodyAge', name: '身体年龄', suffix: '岁' },
    { key: 'muscle', name: '肌肉', suffix: 'kg' },
    { key: 'boneMass', name: '骨量', suffix: 'kg' },
    { key: 'water', name: '水分', suffix: '%' },
    { key: 'visceralFat', name: '内脏脂肪' },
    { key: 'bmr', name: '基础代谢' },
    { key: 'protein', name: '蛋白质', suffix: '%' },
    { key: 'subcutaneousFat', name: '皮下脂肪', suffix: '%' },
    { key: 'weightWithoutFat', name: '去脂体重', suffix: 'kg' },
    { key: 'skeletalMuscleRate', name: '骨骼肌率', suffix: '%' }
]

export const healthFieldsMap = healthFields.reduce<
    Record<string, HealthFieldItem>
>((acc, item) => ({ ...acc, [item.key]: item }), {})
