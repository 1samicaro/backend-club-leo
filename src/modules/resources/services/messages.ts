import { models } from '../../../database'
import type { Message } from '../types/messages'

const getMessages = async (): Promise<Message[]> => {
  const messages = await models.Messages.findAll()
  return messages
}

const postMessage = async (data: Message): Promise<Message> => {
  const newMessage = await models.Messages.create(data) as Message

  return newMessage
}

const messagesServices = { postMessage, getMessages }

export default messagesServices
