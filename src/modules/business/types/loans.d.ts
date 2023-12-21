export interface LoansModel {
  id?: string
  debt: number
  numberQuotas: number
  actualQuota: number
  status: string
  nextPaydate: Date
}

export interface Loans extends LoansModel {
  UserId: string
}
