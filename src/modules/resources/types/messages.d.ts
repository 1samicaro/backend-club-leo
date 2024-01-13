export interface MessagesModel {
  id: number
  query: string
  message: string[]
  user: string
}

export interface Message extends MessagesModel { }
