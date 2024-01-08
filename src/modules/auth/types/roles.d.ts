export interface RolesModel {
  id: number
  name: string
  permissions: string[]
  isPossibleToCreate: boolean
}

export interface Role extends RolesModel {}
