export interface UsersModel {
  id?: string
  name: string[]
  documentNumber: string
  email: string
  password: string
  phone: string
  birthDate: Date
  lastToken?: string
  isVerified?: boolean
  isBanned?: boolean
  isDeleted?: boolean
  username: string
  discount: discounts
  totalPoints: number
  totalSpent: number
  remainingReferrals: number
  representName: string[]
  representDocumentNumber: string
  representEmail: string
  representPhone: string
  docs?: string[]
  address?: string
  website?: string
  description?: string
  profilePic?: string
  debt: number
  isApproved?: boolean
}

export type discounts = Record<string, number>

export interface User extends UsersModel {
  dataValues?: any
  password?: string
  DocumentTypeId: string
  CountryId: string
  CityId: string
  PersonTypeId: string
  RoleId: string
  AdditionalTypeId?: string
  PartnerId?: string
  GrandPartnerId?: string
  GreatGrandPartnerId?: string
  Categories?: string[]
  createdAt: Date
}

export interface UserAuthenticated extends User {
  token?: string
  refreshToken?: string
  dataValues?: User
  role?: number
  id?: string
}
