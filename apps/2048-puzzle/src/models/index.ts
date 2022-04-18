export interface CellData {
    value: number
    toRow: number | null
    toCol: number | null
    random?: boolean
}

export type CellDigits = CellData[][]
