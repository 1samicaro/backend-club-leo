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
const sequelize_1 = require("sequelize");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAll({
        include: [
            database_1.models.DocumentTypes,
            database_1.models.Countries, database_1.models.Cities,
            database_1.models.PersonTypes, database_1.models.Roles,
            database_1.models.AdditionalTypes,
            { model: database_1.models.Users, as: 'Partner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
            database_1.models.Categories
        ]
    });
    return users;
});
const postUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = userData === null || userData === void 0 ? void 0 : userData.docs) === null || _a === void 0 ? void 0 : _a.length) === 0 || (userData === null || userData === void 0 ? void 0 : userData.docs) === undefined)
        userData.isVerified = true;
    userData.username = userData.username.toLowerCase();
    const newUser = yield database_1.models.Users.create(userData);
    if (userData.Categories !== undefined) {
        yield newUser.setCategories(userData.Categories);
    }
    return newUser;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id },
        include: [
            database_1.models.DocumentTypes,
            database_1.models.Countries, database_1.models.Cities,
            database_1.models.PersonTypes, database_1.models.Roles,
            database_1.models.AdditionalTypes,
            { model: database_1.models.Users, as: 'Partner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
            database_1.models.Categories
        ]
    });
    return user;
});
const getUserByUsernameLog = (username) => __awaiter(void 0, void 0, void 0, function* () {
    username = username.toLowerCase();
    const user = yield database_1.models.Users.findOne({
        where: { username },
        include: [
            database_1.models.DocumentTypes,
            database_1.models.Countries, database_1.models.Cities,
            database_1.models.PersonTypes, database_1.models.Roles,
            database_1.models.AdditionalTypes,
            { model: database_1.models.Users, as: 'Partner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
            { model: database_1.models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
            database_1.models.Categories
        ]
    });
    return user;
});
const getUserByUserName = (username) => __awaiter(void 0, void 0, void 0, function* () {
    username = username.toLowerCase();
    const user = yield database_1.models.Users.findOne({
        where: { username },
        attributes: ['id', 'username', 'name', 'remainingReferrals']
    });
    return user;
});
const patchUser = (data, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userData.set(data);
    yield user.save();
    return user;
});
const getChildsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAll({
        where: { PartnerId: id },
        attributes: ['id', 'username', 'name', 'remainingReferrals']
    });
    return users;
});
const getGrandChildsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAndCountAll({
        where: { GrandPartnerId: id },
        attributes: ['id', 'username', 'name', 'remainingReferrals']
    });
    return users;
});
const getGreatGrandChildsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAndCountAll({
        where: { GreatGrandPartnerId: id },
        attributes: ['id', 'username', 'name', 'remainingReferrals']
    });
    return users;
});
const searchUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = [];
    if (data.CountryId !== undefined) {
        options.push({ CountryId: data.CountryId });
    }
    if (data.CityId !== undefined) {
        options.push({ CityId: data.CityId });
    }
    if (data.PersonTypeId !== undefined) {
        options.push({ PersonTypeId: data.PersonTypeId });
    }
    if (data.AdditionalTypeId !== undefined) {
        options.push({ AdditionalTypeId: data.AdditionalTypeId });
    }
    const users = yield database_1.models.Users.findAll({
        where: { [sequelize_1.Op.and]: options }
    });
    return users;
});
const banUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id }
    });
    user.isBanned = true;
    yield user.save();
    return user;
});
const verifyUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id }
    });
    user.isVerified = true;
    yield user.save();
    return user;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.models.Users.findOne({
        where: { id }
    });
    user.isDeleted = true;
    yield user.save();
    return user;
});
const getUsersByCategoryAndCity = (categoryId, cityId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.models.Users.findAll({
        include: [
            { model: database_1.models.Categories, where: { id: categoryId } },
            { model: database_1.models.Cities, where: { id: cityId } }
        ],
        where: { isVerified: true, isBanned: false, isDeleted: false },
        attributes: ['id', 'username', 'name', 'address', 'website', 'description', 'email', 'phone', 'profilePic']
    });
    return users;
});
const usersServices = {
    postUser,
    getUsers,
    getUserById,
    getUserByUsernameLog,
    patchUser,
    getUserByUserName,
    getChildsByUserId,
    getGrandChildsByUserId,
    getGreatGrandChildsByUserId,
    searchUsers,
    banUserById,
    verifyUserById,
    deleteUserById,
    getUsersByCategoryAndCity
};
exports.default = usersServices;
