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
const users_1 = __importDefault(require("../../auth/services/users"));
const transactions_1 = __importDefault(require("../services/transactions"));
const transfer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const destination = req.user;
    const source = req.query.username;
    const amountMoney = parseInt(req.query.amountMoney);
    const amountPoints = parseInt(req.query.amountPoints);
    const categoryId = parseInt(req.query.categoryId);
    if (amountMoney === 0 && amountPoints === 0) {
        throw new Error('Amount must be greater than 0');
    }
    if (amountMoney < 0 || amountPoints < 0) {
        throw new Error('Amount must be greater than 0');
    }
    const userDestination = yield users_1.default.getUserById(destination.id);
    const userSource = yield users_1.default.getUserByUsernameLog(source);
    if (userDestination.discount === null) {
        throw new Error('User invalid');
    }
    if (userSource === null) {
        throw new Error('User not found');
    }
    const discount = userDestination.discount[categoryId];
    if (discount === undefined) {
        throw new Error('Category not found');
    }
    const pbs = Math.floor(((amountMoney * discount) / 500) + ((amountPoints * discount) / 500));
    const total = pbs * 5;
    yield users_1.default.patchUser({ totalSpent: userDestination.totalSpent + total }, userDestination);
    yield transactions_1.default.postTransaction({ amount: total, GeneratedById: userSource.id, DestinationId: userDestination.id, type: 'Sell' });
    if (userSource.PartnerId !== null && userSource.PartnerId !== undefined) {
        const partner = yield users_1.default.getUserById(userSource.PartnerId);
        yield users_1.default.patchUser({ totalPoints: partner.totalPoints + pbs }, partner);
        yield transactions_1.default.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: partner.id, type: 'Buy' });
    }
    if (userSource.GrandPartnerId !== null && userSource.GrandPartnerId !== undefined) {
        const grandPartner = yield users_1.default.getUserById(userSource.GrandPartnerId);
        yield users_1.default.patchUser({ totalPoints: grandPartner.totalPoints + pbs }, grandPartner);
        yield transactions_1.default.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: grandPartner.id, type: 'Buy' });
    }
    if (userSource.GreatGrandPartnerId !== null && userSource.GreatGrandPartnerId !== undefined) {
        const greatGrandPartner = yield users_1.default.getUserById(userSource.GreatGrandPartnerId);
        yield users_1.default.patchUser({ totalPoints: greatGrandPartner.totalPoints + pbs }, greatGrandPartner);
        yield transactions_1.default.postTransaction({ amount: pbs, GeneratedById: userSource.id, DestinationId: greatGrandPartner.id, type: 'Buy' });
    }
    yield users_1.default.patchUser({
        totalPoints: userSource.totalPoints + pbs
    }, userSource);
    yield transactions_1.default.postTransaction({ amount: amountPoints + amountMoney, GeneratedById: userSource.id, DestinationId: userSource.id, type: 'Buy' });
});
const sendPoints = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const source = req.user;
    const destination = req.query.username;
    const amount = parseInt(req.query.amount);
    const userSource = yield users_1.default.getUserById(source.id);
    const userDestination = yield users_1.default.getUserByUsernameLog(destination);
    if (userDestination === null) {
        throw new Error('User not found');
    }
    const actualPoints = userSource.totalPoints - userSource.totalSpent;
    if (actualPoints < amount) {
        throw new Error('Not enough points');
    }
    yield users_1.default.patchUser({ totalSpent: userSource.totalSpent + amount }, userSource);
    yield users_1.default.patchUser({ totalPoints: userDestination.totalPoints + amount }, userDestination);
    yield transactions_1.default.postTransaction({ amount, SourceId: userSource.id, DestinationId: userDestination.id, type: 'PointsTransfer' });
});
const listTransactions = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userSource = yield users_1.default.getUserById(user.id);
    const destination = yield transactions_1.default.getTransactionsByDestination(userSource.id);
    const source = yield transactions_1.default.getTransactionsBySource(userSource.id);
    const transactions = [...destination, ...source];
    return transactions;
});
const listTransactionsByUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const destination = yield transactions_1.default.getTransactionsByDestination(id);
    const source = yield transactions_1.default.getTransactionsBySource(id);
    const transactions = [...destination, ...source];
    return transactions;
});
const transfersController = { transfer, sendPoints, listTransactions, listTransactionsByUser };
exports.default = transfersController;
