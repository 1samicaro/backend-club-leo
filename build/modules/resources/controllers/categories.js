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
const categories_1 = __importDefault(require("../services/categories"));
const users_1 = __importDefault(require("../../auth/services/users"));
const listCategories = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categories_1.default.getCategories();
    return categories;
});
const createCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = req.body;
    const category = yield categories_1.default.postCategory(newCategory);
    return category;
});
const listUsersByCategoryAndCity = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, cityId } = req.params;
    const users = yield users_1.default.getUsersByCategoryAndCity(categoryId, cityId);
    return users;
});
const categoriesController = { createCategory, listCategories, listUsersByCategoryAndCity };
exports.default = categoriesController;
