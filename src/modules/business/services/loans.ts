import { models } from '../../../database'
import type { Loans } from '../types/loans'

const getMaxLoanByUser = async (id: string): Promise<any> => {
  const user = await models.Users.findOne({
    where: { id }
  })

  const maxLoan = (user.totalPoints - user.debt) * 3

  if (user.debt > 0) {
    return 0
  }

  if (user.isApproved === false) {
    return 0
  }

  const actualDate = new Date()
  const antiquityDate = new Date(actualDate.setMonth(actualDate.getMonth() + 3))

  if (user.createdAt > antiquityDate) {
    return 0
  }

  return maxLoan
}

const getLoansByUser = async (id: string): Promise<Loans[]> => {
  const loans = await models.Loans.findAll({
    where: { UserId: id }
  })
  return loans
}

const postLoan = async (loanData: Loans): Promise<Loans> => {
  const newLoan = await models.Loans.create(loanData)
  return newLoan as Loans
}

const patchLoan = async (loanData: unknown, loan: any): Promise<Loans> => {
  const updatedLoan = await loan.set(loanData)
  await loan.save()
  return updatedLoan as Loans
}

const getLoanById = async (id: string): Promise<Loans> => {
  const loan = await models.Loans.findByPk(id)
  return loan as Loans
}

const loansServices = { getMaxLoanByUser, getLoansByUser, postLoan, patchLoan, getLoanById }

export default loansServices
