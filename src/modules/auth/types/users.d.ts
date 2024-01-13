export interface UsersModel {
  id: string
  name: string[]
  documentNumber: string
  email: string
  password: string
  phone: string
  birthDate: Date
  isComplete: boolean
  isVerified: boolean
  isBanned: boolean
  isDeleted: boolean
}

export interface User extends UsersModel {
  password?: string
}
