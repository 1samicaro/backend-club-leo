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
const postTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newTransaction = yield database_1.models.Transactions.create(data);
    return newTransaction;
});
const getTransactionsBySource = (SourceId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield database_1.models.Transactions.findAll({
        where: { SourceId },
        include: [
            { model: database_1.models.Users, as: 'Source', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'Destination', attributes: ['id', 'username'] }
        ]
    });
    return transactions;
});
const getTransactionsByDestination = (DestinationId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield database_1.models.Transactions.findAll({
        where: { DestinationId },
        include: [
            { model: database_1.models.Users, as: 'Source', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'Destination', attributes: ['id', 'username'] }
        ]
    });
    return transactions;
});
const getTransactionsByGeneratedBy = (GeneratedById) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield database_1.models.Transactions.findAll({
        where: { GeneratedById },
        include: [
            { model: database_1.models.Users, as: 'Source', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GeneratedBy', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'Destination', attributes: ['id', 'username'] }
        ]
    });
    return transactions;
});
const transactionsServices = { postTransaction, getTransactionsBySource, getTransactionsByDestination, getTransactionsByGeneratedBy };
exports.default = transactionsServices;
