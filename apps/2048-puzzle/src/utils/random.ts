import { CellDigits } from '../models'

export const resetRandomCellData = (cellDigits: CellDigits) =>
    cellDigits.map(row =>
        row.map(col => ({
            ...col,
            random: !!col.value
        }))
    )
