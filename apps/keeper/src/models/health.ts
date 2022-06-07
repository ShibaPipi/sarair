export enum KeeperEnum {
    PDROL = 'Pdrol',
    CHERRY = 'Cherry'
}

interface BaseHealth {
    name: string
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
    date: string
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
    key: keyof Health
    name: string
    unit?: string
}

export const healthFields: HealthFieldItem[] = [
    { key: 'date', name: '日期' },
    { key: 'weight', name: '体重', unit: 'kg' },
    { key: 'score', name: '分数' },
    { key: 'bmi', name: 'BMI', unit: 'kg/m²' },
    { key: 'bodyFatRate', name: '体脂率', unit: '%' },
    { key: 'bodyAge', name: '身体年龄', unit: '岁' },
    { key: 'muscle', name: '肌肉', unit: 'kg' },
    { key: 'boneMass', name: '骨量', unit: 'kg' },
    { key: 'water', name: '水分', unit: '%' },
    { key: 'visceralFat', name: '内脏脂肪' },
    { key: 'bmr', name: '基础代谢', unit: 'kJ/(m²·h)' },
    { key: 'protein', name: '蛋白质', unit: '%' },
    { key: 'subcutaneousFat', name: '皮下脂肪', unit: '%' },
    { key: 'weightWithoutFat', name: '去脂体重', unit: 'kg' },
    { key: 'skeletalMuscleRate', name: '骨骼肌率', unit: '%' }
]

export const healthFieldsMap = healthFields.reduce<
    Record<string, HealthFieldItem>
>((acc, item) => ({ ...acc, [item.key]: item }), {})
