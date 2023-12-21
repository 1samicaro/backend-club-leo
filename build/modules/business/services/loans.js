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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../database");
const getMaxLoanByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id }
    });
    const maxLoan = (user.totalPoints - user.debt) * 3;
    if (user.debt > 0) {
        return 0;
    }
    if (user.isApproved === false) {
        return 0;
    }
    const actualDate = new Date();
    const antiquityDate = new Date(actualDate.setMonth(actualDate.getMonth() + 3));
    if (user.createdAt > antiquityDate) {
        return 0;
    }
    return maxLoan;
});
const getLoansByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const loans = yield database_1.models.Loans.findAll({
        where: { UserId: id }
    });
    return loans;
});
const postLoan = (loanData) => __awaiter(void 0, void 0, void 0, function* () {
    const newLoan = yield database_1.models.Loans.create(loanData);
    return newLoan;
});
const patchLoan = (loanData, loan) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLoan = yield loan.set(loanData);
    yield loan.save();
    return updatedLoan;
});
const getLoanById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = yield database_1.models.Loans.findByPk(id);
    return loan;
});
const loansServices = { getMaxLoanByUser, getLoansByUser, postLoan, patchLoan, getLoanById };
exports.default = loansServices;
