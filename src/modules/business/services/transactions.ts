import type { Transaction } from '../types/transactions'
import { models } from '../../../database'

const postTransaction = async (data: Transaction): Promise<Transaction> => {
  const newTransaction = await models.Transactions.create(data) as Transaction

  return newTransaction
}

const getTransactionsBySource = async (SourceId: string): Promise<Transaction[]> => {
  const transactions = await models.Transactions.findAll({
    where: { SourceId },
    include: [
      { model: models.Users, as: 'Source', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
      { model: models.Users, as: 'Destination', attributes: ['id', 'username'] }
    ]
  })
  return transactions
}

const getTransactionsByDestination = async (DestinationId: string): Promise<Transaction[]> => {
  const transactions = await models.Transactions.findAll({
    where: { DestinationId },
    include: [
      { model: models.Users, as: 'Source', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
      { model: models.Users, as: 'Destination', attributes: ['id', 'username'] }
    ]
  })
  return transactions
}

const getTransactionsByGeneratedBy = async (GeneratedById: string): Promise<Transaction[]> => {
  const transactions = await models.Transactions.findAll({
    where: { GeneratedById },
    include: [
      { model: models.Users, as: 'Source', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
      { model: models.Users, as: 'Destination', attributes: ['id', 'username'] }
    ]
  })
  return transactions
}

const transactionsServices = { postTransaction, getTransactionsBySource, getTransactionsByDestination, getTransactionsByGeneratedBy }

export default transactionsServices
