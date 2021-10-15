export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  created: number
}

export type Param = Pick<Project, 'name' | 'personId'>
