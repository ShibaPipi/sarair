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
