import type { Request } from 'express'

import type { UserAuthenticated } from '../../auth/types/users'
import type { Transaction } from '../types/transactions'
import usersServices from '../../auth/services/users'
import transactionsServices from '../services/transactions'

const transfer = async (req: Request): Promise<void> => {
  const destination = req.user as UserAuthenticated
  const source = req.query.username as string
  const amountMoney = parseInt(req.query.amountMoney as string)
  const amountPoints = parseInt(req.query.amountPoints as string)
  const categoryId = parseInt(req.query.categoryId as string)

  if (amountMoney === 0 && amountPoints === 0) {
    throw new Error('Amount must be greater than 0')
  }
  if (amountMoney < 0 || amountPoints < 0) {
    throw new Error('Amount must be greater than 0')
  }

  const userDestination: UserAuthenticated = await usersServices.getUserById(destination.id as string)
  const userSource: UserAuthenticated = await usersServices.getUserByUsernameLog(source)

  if (userDestination.discount === null) {
    throw new Error('User invalid')
  }

  if (userSource === null) {
    throw new Error('User not found')
  }

  const discount = userDestination.discount[categoryId]

  if (discount === undefined) {
    throw new Error('Category not found')
  }

  const pbs = Math.floor(((amountMoney * discount) / 500) + ((amountPoints * discount) / 500))
  const total = pbs * 5

  await usersServices.patchUser({ totalSpent: userDestination.totalSpent + total }, userDestination)
  await transactionsServices.postTransaction({ amount: total, GeneratedById: userSource.id, DestinationId: userDestination.id, type: 'Sell' })

  if (userSource.PartnerId !== null && userSource.PartnerId !== undefined) {
    const partner = await usersServices.getUserById(userSource.PartnerId)
    await usersServices.patchUser({ totalPoints: partner.totalPoints + pbs }, partner)
    await transactionsServices.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: partner.id, type: 'Buy' })
  }
  if (userSource.GrandPartnerId !== null && userSource.GrandPartnerId !== undefined) {
    const grandPartner = await usersServices.getUserById(userSource.GrandPartnerId)
    await usersServices.patchUser({ totalPoints: grandPartner.totalPoints + pbs }, grandPartner)
    await transactionsServices.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: grandPartner.id, type: 'Buy' })
  }
  if (userSource.GreatGrandPartnerId !== null && userSource.GreatGrandPartnerId !== undefined) {
    const greatGrandPartner = await usersServices.getUserById(userSource.GreatGrandPartnerId)
    await usersServices.patchUser({ totalPoints: greatGrandPartner.totalPoints + pbs }, greatGrandPartner)
    await transactionsServices.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: greatGrandPartner.id, type: 'Buy' })
  }

  await usersServices.patchUser({
    totalPoints: userSource.totalPoints + pbs
  }, userSource)
  await transactionsServices.postTransaction({ amount: amountPoints + amountMoney, GeneratedById: userSource.id, DestinationId: userSource.id, type: 'Buy' })
}

const sendPoints = async (req: Request): Promise<void> => {
  const source = req.user as UserAuthenticated
  const destination = req.query.username as string
  const amount = parseInt(req.query.amount as string)

  const userSource: UserAuthenticated = await usersServices.getUserById(source.id as string)
  const userDestination: UserAuthenticated = await usersServices.getUserByUsernameLog(destination)

  if (userDestination === null) {
    throw new Error('User not found')
  }
  const actualPoints = userSource.totalPoints - userSource.totalSpent

  if (actualPoints < amount) {
    throw new Error('Not enough points')
  }

  await usersServices.patchUser({ totalSpent: userSource.totalSpent + amount }, userSource)
  await usersServices.patchUser({ totalPoints: userDestination.totalPoints + amount }, userDestination)
  await transactionsServices.postTransaction({ amount, SourceId: userSource.id, DestinationId: userDestination.id, type: 'PointsTransfer' })
}

const listTransactions = async (req: Request): Promise<Transaction[]> => {
  const user = req.user as UserAuthenticated
  const userSource: UserAuthenticated = await usersServices.getUserById(user.id as string)
  const destination = await transactionsServices.getTransactionsByDestination(userSource.id as string)
  const source = await transactionsServices.getTransactionsBySource(userSource.id as string)

  const transactions = [...destination, ...source]
  return transactions
}

const listTransactionsByUser = async (req: Request): Promise<Transaction[]> => {
  const id = req.params.id
  const destination = await transactionsServices.getTransactionsByDestination(id)
  const source = await transactionsServices.getTransactionsBySource(id)

  const transactions = [...destination, ...source]
  return transactions
}

const transfersController = { transfer, sendPoints, listTransactions, listTransactionsByUser }

export default transfersController
