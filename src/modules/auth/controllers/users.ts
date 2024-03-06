import type { Request } from 'express'

import usersService from '../services/users'
import rolesServices from '../services/roles'
import type { User, UserAuthenticated } from '../types/users'
import { encrypt } from '../utils/encrypt'
import sendEmail from '../../../middlewares/sendEmail'
import { v4 as uuidv4 } from 'uuid'
import Log from '../../../middlewares/logger'

const listUsers = async (): Promise<User[]> => {
  const users = await usersService.getUsers()
  return users
}

const createUsers = async (req: Request): Promise<User> => {
  const hash = await encrypt(req.body.password)
  Log.error(req.body)
  const RoleId = req.body.RoleId

  const role = await rolesServices.getRoleById(RoleId)

  if (!role.isPossibleToCreate) {
    throw new Error('You can not create a user of this role')
  }

  const userData = req.body
  userData.password = hash

  if (userData.Partner !== undefined && userData.Partner.length > 0) {
    const partner = await usersService.getUserByUsernameLog(userData.Partner)
    if (partner?.id === undefined) { throw new Error('Partner not found') }
    if (partner.remainingReferrals === 0) { throw new Error('Partner has no more referrals') }
    userData.PartnerId = partner.id
    userData.GrandPartnerId = partner.PartnerId
    userData.GreatGrandPartnerId = partner.GrandPartnerId
    await usersService.patchUser({ remainingReferrals: partner.remainingReferrals - 1 }, partner)
  }

  const newUser: UserAuthenticated = await usersService.postUser(userData)
  const { password, ...user } = newUser.dataValues as User

  await sendEmail(user.email, 'Bienvenido a mingga', `Hola ${user?.name[1]} ${user?.name[0]} `, `<!DOCTYPE html>
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
              <h2>Cordial Saludo ${user?.name[1]} ${user?.name[0]}</h2>
              <br />
              <p>Te damos la bienvenida como socio de LEO, para construir entre todos un mundo más educado y culto.</p>
              <br />
              <h3>Para ingresar puede utilizar los siguientes items:</h3>
              <p>Usuario: ${user.username} y la Contraseña suministrada</p>
              <br />
              <h3>Ya tienes acceso a nuestra biblioteca digital con más de 15.000 obras en 5 idiomas, y si lo deseas, puedes descargar todo el catálogo en tu celular o tableta.</h3>
              <p>Recuerda que para construir tu negocio propio LEO y obtener ingresos de por vida, solo debes hacer dos cosas muy sencillas:</p>
              <ul>
                  <li>Invitar a máximo 20 socios directos, con tu usuario.</li>
                  <li>Hacer seguimiento a tu red y apoyar a tus socios para que cada uno construya su propia Red Personal de Amigos. También será socios tuyos!.</li>
              </ul>
              <br />
              <br />
              <br />
              <p>Atentamente,</p>
              <h2>Equipo LEO</h2>
          </article>
      </section>
  </body>`)

  return user
}

const userInfo = async (req: Request): Promise<User> => {
  const id = req.params.id
  const userData: UserAuthenticated = await usersService.getUserById(id)

  const { password, ...user } = userData.dataValues as User

  return user
}

const listDescendants = async (req: Request): Promise<any> => {
  const { id } = req.user as UserAuthenticated
  const childs = await usersService.getChildsByUserId(id as string)

  const grandChilds = await Promise.all(childs.map(async (child) => {
    const sons = await usersService.getChildsByUserId(child.id as string)
    return sons
  }))

  const descendants = childs.map((child, index) => {
    return {
      child,
      grandChilds: grandChilds[index]
    }
  })

  return descendants
}

const searchUsers = async (req: Request): Promise<User[]> => {
  const data = req.body
  const users = await usersService.searchUsers(data)
  return users
}

const verifyUserById = async (req: Request): Promise<User> => {
  const id = req.params.id
  const user = await usersService.verifyUserById(id)
  if (user === null) {
    throw new Error('User not found')
  }

  await sendEmail(user.email, 'Bienvenido a mingga', `Hola ${user?.name[1]} ${user?.name[0]} `, `<!DOCTYPE html>
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
                  <h2>Cordial Saludo ${user?.name[1]} ${user?.name[0]}</h2>
                  <br />
                  <p>Te damos la bienvenida tu usuario a sido verificado, ya puedes ingresar con nosotros</p>
                  <br />
                  <p>Atentamente,</p>
                  <h2>Equipo Leo</h2>
              </article>
          </section>
      </body>
  </html>`)
  return user
}

const deleteUserById = async (req: Request): Promise<void> => {
  const { id } = req.user as UserAuthenticated
  const user = await usersService.getUserById(id as string)
  if (user === null) {
    throw new Error('User not found')
  }
  await usersService.deleteUserById(id as string)
}

const banUserById = async (req: Request): Promise<void> => {
  const id = req.params.id
  const user = await usersService.getUserById(id)
  if (user === null) {
    throw new Error('User not found')
  }
  await usersService.banUserById(id)
}

const getUserByUserName = async (req: Request): Promise<User> => {
  const userName = req.params.username
  const user = await usersService.getUserByUserName(userName)
  if (user === null) {
    throw new Error('User not found')
  }
  return user
}

const updateUserById = async (req: Request): Promise<User> => {
  const { id } = req.user as UserAuthenticated
  const userData = req.body
  const user = await usersService.getUserById(id as string)
  if (user === null) {
    throw new Error('User not found')
  }

  if (userData.password !== undefined) {
    const hash = await encrypt(userData.password)
    userData.password = hash
  }

  if (userData.name !== undefined) {
    delete userData.name
  }

  if (userData.username !== undefined) {
    delete userData.username
  }

  if (userData.email !== undefined) {
    delete userData.email
  }

  if (userData.documentNumber !== undefined) {
    delete userData.documentNumber
  }

  if (userData.documentType !== undefined) {
    delete userData.documentType
  }

  if (userData.birthDate !== undefined) {
    delete userData.birthDate
  }

  if (userData.DocumentTypeId !== undefined) {
    delete userData.DocumentTypeId
  }

  if (userData.PersonTypeId !== undefined) {
    delete userData.PersonTypeId
  }

  if (userData.AdditionalTypeId !== undefined) {
    delete userData.AdditionalTypeId
  }

  if (userData.Partner !== undefined) {
    delete userData.Partner
  }

  if (userData.RoleId !== undefined) {
    userData.isVerified = false
  }

  const updatedUser = await usersService.patchUser(userData, user)
  return updatedUser
}

const resetPassword = async (req: Request): Promise<void> => {
  const username = req.params.username
  const user = await usersService.getUserByUsernameLog(username)

  const tokenId = uuidv4()
  await usersService.patchUser({ lastToken: tokenId }, user)

  await sendEmail(user.email, 'Reset de contraseña', `Hola ${user?.name[1]} ${user?.name[0]} `, `<!DOCTYPE html>
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
                  <h2>Hola, ${user?.name[1]} ${user?.name[0]}</h2>
                  <h3>Hemos recibido una solicitud de cambio de contraseña para tu usuario ${user.username}</h3>
                  <h3>si no la solicitaste has caso omiso, si lo hiciste da click </h3>
                  <a href="https://biblioleo-backend-8420e56b8a6b.herokuapp.com/auth/users/resetVerify/${user?.username}/${tokenId}">AQUI</a>
                  <h3>y luego  ingresa a tu cuenta con la contraseña 00000000</h3>
                  <br />
                  <h3>No olvides cambiar tu contraseña una vez logres ingresar de nuevo.</h3>
                  <br />
                  <h2>Equipo LEO</h2>
              </article>
          </section>
      </body>
  </html>`)
}

const resetPasswordVerify = async (req: Request): Promise<void> => {
  const username = req.params.username
  const id = req.params.id
  const user = await usersService.getUserByUsernameLog(username)

  if (user.lastToken !== id) {
    throw new Error('Invalid id')
  }

  const hash = await encrypt('00000000')
  await usersService.patchUser({ password: hash, lastToken: null }, user)
}

const updatePayData = async (req: Request): Promise<User> => {
  let { id } = req.user as UserAuthenticated
  const userData = req.body
  if (userData.idToActivate !== undefined) {
    id = userData.idToActivate
  }
  const user = await usersService.getUserById(id as string)
  if (user === null) {
    throw new Error('User not found')
  }
  userData.totalPoints = 3000
  if (user.PartnerId !== null && user.PartnerId !== undefined) {
    const partner = await usersService.getUserById(user.PartnerId)
    partner.totalPoints += 4500
    if (partner !== null) {
      await usersService.patchUser(partner, partner)
    }
  }
  if (user.GrandPartnerId !== null && user.GrandPartnerId !== undefined) {
    const grandPartner = await usersService.getUserById(user.GrandPartnerId)
    grandPartner.totalPoints += 6000
    if (grandPartner !== null) {
      await usersService.patchUser(grandPartner, grandPartner)
    }
  }
  if (user.GreatGrandPartnerId !== null && user.GreatGrandPartnerId !== undefined) {
    const greatGrandPartner = await usersService.getUserById(user.GreatGrandPartnerId)
    greatGrandPartner.totalPoints += 7500
    if (greatGrandPartner !== null) {
      await usersService.patchUser(greatGrandPartner, greatGrandPartner)
    }
  }

  const updatedUser = await usersService.patchUser(userData, user)
  return updatedUser
}

const usersController = { updatePayData, resetPasswordVerify, updateUserById, createUsers, getUserByUserName, listUsers, userInfo, listDescendants, searchUsers, deleteUserById, verifyUserById, banUserById, resetPassword }

export default usersController
