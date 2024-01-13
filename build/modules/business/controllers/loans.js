"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loans_1 = __importDefault(require("../services/loans"));
const users_1 = __importDefault(require("../../auth/services/users"));
const transactions_1 = __importDefault(require("../services/transactions"));
const getMaxLoanByUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield loans_1.default.getMaxLoanByUser(id);
    return user;
});
const getLoansByUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const loans = yield loans_1.default.getLoansByUser(id);
    return loans;
});
const postLoan = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { amount } = req.body;
    const { numberQuotas } = req.body;
    console.log(amount);
    const actualDate = new Date();
    const nextPaydate = new Date(actualDate.setMonth(actualDate.getMonth() + 1));
    const antiquityDate = new Date(actualDate.setMonth(actualDate.getMonth() + 3));
    const user = yield users_1.default.getUserById(id);
    if (user.debt === undefined) {
        throw new Error('User not found');
    }
    if (user.debt > 0) {
        throw new Error('You have a debt');
    }
    if (user.isApproved === false) {
        throw new Error('You are not approved');
    }
    if (amount > (user.totalPoints - user.debt) * 3) {
        throw new Error('You can not request more than your limit');
    }
    if (user.createdAt > antiquityDate) {
        throw new Error('You do not have enough antiquity');
    }
    const totalDebt = parseInt(amount) + (parseInt(amount) * 0.02 * numberQuotas);
    yield users_1.default.patchUser({
        totalPoints: user.totalPoints + parseInt(amount),
        debt: totalDebt
    }, user);
    yield transactions_1.default.postTransaction({ amount: parseInt(amount), DestinationId: user.id, type: 'Loan' });
    const loan = yield loans_1.default.postLoan({ debt: totalDebt, UserId: id, numberQuotas, actualQuota: 0, status: 'active', nextPaydate });
    return loan;
});
const approveLoan = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield users_1.default.getUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    yield users_1.default.patchUser({
        isApproved: true
    }, user);
    return user;
});
const payLoan = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const loan = yield loans_1.default.getLoanById(id);
    if (loan === null) {
        throw new Error('Loan not found');
    }
    if (loan.actualQuota === loan.numberQuotas) {
        throw new Error('Loan already paid');
    }
    const user = yield users_1.default.getUserById(loan.UserId);
    if (user === null) {
        throw new Error('User not found');
    }
    const actualDate = new Date(loan.nextPaydate);
    const nextPaydate = new Date(actualDate.setMonth(actualDate.getMonth() + 1));
    if (user.totalPoints < (loan.debt / loan.numberQuotas)) {
        throw new Error('Not enough points');
    }
    yield loans_1.default.patchLoan({
        actualQuota: loan.actualQuota + 1,
        nextPaydate
    }, loan);
    yield users_1.default.patchUser({
        totalPoints: user.totalPoints - (loan.debt / loan.numberQuotas),
        debt: user.debt - (loan.debt / loan.numberQuotas)
    }, user);
    yield transactions_1.default.postTransaction({ amount: loan.debt / loan.numberQuotas, GeneratedById: user.id, DestinationId: user.id, type: 'PayLoan' });
    if (loan.actualQuota === loan.numberQuotas) {
        yield loans_1.default.patchLoan({
            status: 'paid'
        }, loan);
    }
    return loan;
});
const loansController = { getMaxLoanByUser, getLoansByUser, postLoan, approveLoan, payLoan };
exports.default = loansController;
