export interface Project {
    id: number
    name: string
    personId: number
    organization: string
    created: number
}

export type Param = Pick<Project, 'name' | 'personId'>
