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
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.models.Categories.findAll({ raw: true });
    return categories;
});
const postCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield database_1.models.Categories.create(data);
    return newCategory;
});
const getCategoriesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.models.Categories.findAll({
        where: { id }
    });
    return categories;
});
const categoriesServices = { postCategory, getCategories, getCategoriesById };
exports.default = categoriesServices;
