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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../services/users"));
const roles_1 = __importDefault(require("../services/roles"));
const encrypt_1 = require("../utils/encrypt");
const sendEmail_1 = __importDefault(require("../../../middlewares/sendEmail"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("../../../middlewares/logger"));
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.default.getUsers();
    return users;
});
const createUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield (0, encrypt_1.encrypt)(req.body.password);
    logger_1.default.error(req.body);
    const RoleId = req.body.RoleId;
    const role = yield roles_1.default.getRoleById(RoleId);
    if (!role.isPossibleToCreate) {
        throw new Error('You can not create a user of this role');
    }
    const userData = req.body;
    userData.password = hash;
    if (userData.Partner !== undefined && userData.Partner.length > 0) {
        const partner = yield users_1.default.getUserByUsernameLog(userData.Partner);
        if ((partner === null || partner === void 0 ? void 0 : partner.id) === undefined) {
            throw new Error('Partner not found');
        }
        if (partner.remainingReferrals === 0) {
            throw new Error('Partner has no more referrals');
        }
        userData.PartnerId = partner.id;
        userData.GrandPartnerId = partner.PartnerId;
        userData.GreatGrandPartnerId = partner.GrandPartnerId;
        yield users_1.default.patchUser({ remainingReferrals: partner.remainingReferrals - 1 }, partner);
    }
    const newUser = yield users_1.default.postUser(userData);
    const _a = newUser.dataValues, { password } = _a, user = __rest(_a, ["password"]);
    yield (0, sendEmail_1.default)(user.email, 'Bienvenido a Clubleo', `Hola ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]} `, `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <title>Presentación Clubleo</title>
      <style>
          .img-container {
              text-align: center;
              display: block;
          }
          .article-container{
              text-align: center;
              display: block;
          }
          ul {
              list-style: none;
          }
      </style>
  </head>
  <body>
      <header>
          <span class="img-container">
              <!-- <img src="https://res.cloudinary.com/dsuxfsvt1/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1684973775/LogoMinggaN_uqm8we.jpg?_s=public-apps" alt="logo" width="280"/> -->
              <!-- <img src="https://drive.google.com/file/d/11rwPEAoD4hKWAUgHwslAtQvoEIrtuQjo/view?usp=sharing" alt="logo"/> -->
              <img src="https://drive.google.com/thumbnail?sz=w1920&id=11rwPEAoD4hKWAUgHwslAtQvoEIrtuQjo">
          </span>
      </header>
      <br />
      <br />
      <section>
          <article class="article-container">
              <h2>Cordial Saludo ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]}</h2>
              <br />
              <p>Te damos la bienvenida como socio de LEO, para fortalecer tus competencias comunicativas y construir entre todos un mundo más educado y culto.</p>
              <br />
              <h3>Para ingresar puede utilizar los siguientes items:</h3>
              <p>Usuario: ${user.username} y la Contraseña suministrada</p>
              <br />
              <h3>Ya tienes acceso a nuestra biblioteca digital con más de 15.000 obras en 5 idiomas, y si lo deseas, puedes descargar todo el catálogo en tu celular o tableta.</h3>
              <p>Si deseas apoyar a LEO en su crecimiento en nuestro país y el mundo, puedes participar en el Plan Amigos, y recibirás importantes beneficios para lograr la excelencia en tus estudios. Solo debes hacer dos cosas muy sencillas:</p>
              <ul>
                  <li>Invitar a máximo 20 amigos o compañeros de estudio a ser socios de LEO, enviándoles tu link personal o proporcionándoles tu usuario. Una vez completes tus 20 invitados, no tendrás que invitar a nadie más, y recibirás tu Tableta de 10” con la biblioteca digital grabada.</li>
                  <li>Hacer seguimiento a tus invitados y apoyarlos para que cada uno pueda invitar a sus 20 socios. También será socios tuyos! y recibirás tu PC portátil!.</li>
              </ul>
              <br />
              <br />
              <br />
              <p>Atentamente,</p>
              <h2>Equipo LEO</h2>
          </article>
      </section>
  </body>`);
    return user;
});
const userInfo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userData = yield users_1.default.getUserById(id);
    const _a = userData.dataValues, { password } = _a, user = __rest(_a, ["password"]);
    return user;
});
const listDescendants = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const childs = yield users_1.default.getChildsByUserId(id);
    const grandChilds = yield Promise.all(childs.map((child) => __awaiter(void 0, void 0, void 0, function* () {
        const sons = yield users_1.default.getChildsByUserId(child.id);
        return sons;
    })));
    const descendants = childs.map((child, index) => {
        return {
            child,
            grandChilds: grandChilds[index]
        };
    });
    return descendants;
});
const searchUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const users = yield users_1.default.searchUsers(data);
    return users;
});
const verifyUserById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield users_1.default.verifyUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    yield (0, sendEmail_1.default)(user.email, 'Bienvenido a Clubleo', `Hola ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]} `, `<!DOCTYPE html>
  <html>
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Usuario verificado</title>
          <style>
              .img-container {
                  text-align: center;
                  display: block;
              }
              .article-container{
                  text-align: center;
                  display: block;
              }
              ul {
                  list-style: none;
              }
          </style>
      </head>
      <body>
          <header>
              <span class="img-container">
                  <img src="https://github.com/1samicaro/frontend-club-leo/blob/main/src/assets/logoleo.png?raw=true" alt="logo" width="280"/>
              </span>
          </header>
          <br />
          <br />
          <section>
              <article class="article-container">
                  <h2>Cordial Saludo ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]}</h2>
                  <br />
                  <p>Te damos la bienvenida tu usuario a sido verificado, ya puedes ingresar con nosotros</p>
                  <br />
                  <p>Atentamente,</p>
                  <h2>Equipo Leo</h2>
              </article>
          </section>
      </body>
  </html>`);
    return user;
});
const deleteUserById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield users_1.default.getUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    yield users_1.default.deleteUserById(id);
});
const banUserById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield users_1.default.getUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    yield users_1.default.banUserById(id);
});
const getUserByUserName = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const user = yield users_1.default.getUserByUserName(userName);
    if (user === null) {
        throw new Error('User not found');
    }
    return user;
});
const updateUserById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const userData = req.body;
    const user = yield users_1.default.getUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    if (userData.password !== undefined) {
        const hash = yield (0, encrypt_1.encrypt)(userData.password);
        userData.password = hash;
    }
    if (userData.name !== undefined) {
        delete userData.name;
    }
    if (userData.username !== undefined) {
        delete userData.username;
    }
    if (userData.email !== undefined) {
        delete userData.email;
    }
    if (userData.documentNumber !== undefined) {
        delete userData.documentNumber;
    }
    if (userData.documentType !== undefined) {
        delete userData.documentType;
    }
    if (userData.birthDate !== undefined) {
        delete userData.birthDate;
    }
    if (userData.DocumentTypeId !== undefined) {
        delete userData.DocumentTypeId;
    }
    if (userData.PersonTypeId !== undefined) {
        delete userData.PersonTypeId;
    }
    if (userData.AdditionalTypeId !== undefined) {
        delete userData.AdditionalTypeId;
    }
    if (userData.Partner !== undefined) {
        delete userData.Partner;
    }
    if (userData.RoleId !== undefined) {
        userData.isVerified = false;
    }
    const updatedUser = yield users_1.default.patchUser(userData, user);
    return updatedUser;
});
const resetPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield users_1.default.getUserByUsernameLog(username);
    const tokenId = (0, uuid_1.v4)();
    yield users_1.default.patchUser({ lastToken: tokenId }, user);
    yield (0, sendEmail_1.default)(user.email, 'Reset de contraseña', `Hola ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]} `, `<!DOCTYPE html>
  <html>
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Reset de contraseña</title>
          <style>
              .img-container {
                  text-align: center;
                  display: block;
              }
              .article-container{
                  text-align: center;
                  display: block;
              }
              ul {
                  list-style: none;
              }
          </style>
      </head>
      <body>
          <header>
              <span class="img-container">
                  <img src="https://github.com/1samicaro/frontend-club-leo/blob/main/src/assets/logoleo.png?raw=true" alt="logo" width="280"/>
              </span>
          </header>
          <br />
          <br />
          <section>
              <article class="article-container">
                  <h2>Hola, ${user === null || user === void 0 ? void 0 : user.name[1]} ${user === null || user === void 0 ? void 0 : user.name[0]}</h2>
                  <h3>Hemos recibido una solicitud de cambio de contraseña para tu usuario ${user.username}</h3>
                  <h3>si no la solicitaste has caso omiso, si lo hiciste da click </h3>
                  <a href="https://clubleo-back-326bb7d836eb.herokuapp.com/auth/users/resetVerify/${user === null || user === void 0 ? void 0 : user.username}/${tokenId}">AQUI</a>
                  <h3>y luego  ingresa a tu cuenta con la contraseña 00000000</h3>
                  <br />
                  <h3>No olvides cambiar tu contraseña una vez logres ingresar de nuevo.</h3>
                  <br />
                  <h2>Equipo LEO</h2>
              </article>
          </section>
      </body>
  </html>`);
});
const resetPasswordVerify = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const id = req.params.id;
    const user = yield users_1.default.getUserByUsernameLog(username);
    if (user.lastToken !== id) {
        throw new Error('Invalid id');
    }
    const hash = yield (0, encrypt_1.encrypt)('00000000');
    yield users_1.default.patchUser({ password: hash, lastToken: null }, user);
});
const updatePayData = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.user;
    const userData = req.body;
    if (userData.idToActivate !== undefined) {
        id = userData.idToActivate;
    }
    const user = yield users_1.default.getUserById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    userData.totalPoints = 0;
    if (user.PartnerId !== null && user.PartnerId !== undefined) {
        const partner = yield users_1.default.getUserById(user.PartnerId);
        partner.totalPoints += 5;
        if (partner !== null) {
            yield users_1.default.patchUser(partner, partner);
        }
    }
    if (user.GrandPartnerId !== null && user.GrandPartnerId !== undefined) {
        const grandPartner = yield users_1.default.getUserById(user.GrandPartnerId);
        grandPartner.totalPoints += 8;
        if (grandPartner !== null) {
            yield users_1.default.patchUser(grandPartner, grandPartner);
        }
    }
    if (user.GreatGrandPartnerId !== null && user.GreatGrandPartnerId !== undefined) {
        const greatGrandPartner = yield users_1.default.getUserById(user.GreatGrandPartnerId);
        greatGrandPartner.totalPoints += 12;
        if (greatGrandPartner !== null) {
            yield users_1.default.patchUser(greatGrandPartner, greatGrandPartner);
        }
    }
    const updatedUser = yield users_1.default.patchUser(userData, user);
    return updatedUser;
});
const usersController = { updatePayData, resetPasswordVerify, updateUserById, createUsers, getUserByUserName, listUsers, userInfo, listDescendants, searchUsers, deleteUserById, verifyUserById, banUserById, resetPassword };
exports.default = usersController;
