import type { Loans } from '../types/loans'

import loansServices from '../services/loans'
import usersServices from '../../auth/services/users'
import transactionsServices from '../services/transactions'
import type { UserAuthenticated } from '../../auth/types/users'
const getMaxLoanByUser = async (req: any): Promise<Loans> => {
  const { id } = req.user

  const user = await loansServices.getMaxLoanByUser(id)

  return user
}

const getLoansByUser = async (req: any): Promise<Loans[]> => {
  const { id } = req.user

  const loans = await loansServices.getLoansByUser(id)

  return loans
}

const postLoan = async (req: any): Promise<Loans> => {
  const { id } = req.user
  const { amount } = req.body
  const { numberQuotas } = req.body
  console.log(amount)
  const actualDate = new Date()
  const nextPaydate = new Date(actualDate.setMonth(actualDate.getMonth() + 1))
  const antiquityDate = new Date(actualDate.setMonth(actualDate.getMonth() + 3))

  const user = await usersServices.getUserById(id) as UserAuthenticated

  if (user.debt === undefined) {
    throw new Error('User not found')
  }

  if (user.debt > 0) {
    throw new Error('You have a debt')
  }

  if (user.isApproved === false) {
    throw new Error('You are not approved')
  }

  if (amount > (user.totalPoints - user.debt) * 3) {
    throw new Error('You can not request more than your limit')
  }

  if (user.createdAt > antiquityDate) {
    throw new Error('You do not have enough antiquity')
  }

  const totalDebt = parseInt(amount) + (parseInt(amount) * 0.02 * numberQuotas)

  await usersServices.patchUser({
    totalPoints: user.totalPoints + parseInt(amount),
    debt: totalDebt
  }, user)

  await transactionsServices.postTransaction({ amount: parseInt(amount), DestinationId: user.id, type: 'Loan' })

  const loan = await loansServices.postLoan({ debt: totalDebt, UserId: id, numberQuotas, actualQuota: 0, status: 'active', nextPaydate })

  return loan
}

const approveLoan = async (req: any): Promise<any> => {
  const { id } = req.params

  const user = await usersServices.getUserById(id)

  if (user === null) {
    throw new Error('User not found')
  }

  await usersServices.patchUser({
    isApproved: true
  }, user)

  return user
}

const payLoan = async (req: any): Promise<any> => {
  const { id } = req.params

  const loan = await loansServices.getLoanById(id)

  if (loan === null) {
    throw new Error('Loan not found')
  }

  if (loan.actualQuota === loan.numberQuotas) {
    throw new Error('Loan already paid')
  }

  const user = await usersServices.getUserById(loan.UserId)

  if (user === null) {
    throw new Error('User not found')
  }

  const actualDate = new Date(loan.nextPaydate)
  const nextPaydate = new Date(actualDate.setMonth(actualDate.getMonth() + 1))

  if (user.totalPoints < (loan.debt / loan.numberQuotas)) {
    throw new Error('Not enough points')
  }

  await loansServices.patchLoan({
    actualQuota: loan.actualQuota + 1,
    nextPaydate
  }, loan)

  await usersServices.patchUser({
    totalPoints: user.totalPoints - (loan.debt / loan.numberQuotas),
    debt: user.debt - (loan.debt / loan.numberQuotas)
  }, user)

  await transactionsServices.postTransaction({ amount: loan.debt / loan.numberQuotas, GeneratedById: user.id, DestinationId: user.id, type: 'PayLoan' })

  if (loan.actualQuota === loan.numberQuotas) {
    await loansServices.patchLoan({
      status: 'paid'
    }, loan)
  }

  return loan
}

const loansController = { getMaxLoanByUser, getLoansByUser, postLoan, approveLoan, payLoan }

export default loansController
