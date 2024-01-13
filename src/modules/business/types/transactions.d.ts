export interface TransactionModel {
  id?: number
  amount: number
  type: string
}

export interface Transaction extends TransactionModel {
  SourceId?: string
  DestinationId?: string
  GeneratedById?: string
}
