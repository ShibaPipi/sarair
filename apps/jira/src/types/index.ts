export interface SortProps {
    // 被选中的 id
    fromId: number
    // 目标位置 id
    referenceId: number
    // 放在目标前面还是后面
    type: 'before' | 'after'
    fromBoardId?: number
    toBoardId?: number
}

export * from './board'
export * from './epic'
export * from './project'
export * from './task'
