export interface Task {
    id: number
    name: string
    // 经办人 id
    processorId: number
    projectId: number
    // 任务组 id
    epicId: number
    boardId: number
    // bug or task
    typeId: number
    note: string
}

export interface TaskType {
    id: number
    name: string
}
