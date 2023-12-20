import morgan, { type StreamOptions } from 'morgan'

import Log from '.'

const stream: StreamOptions = {
  write: (message) => Log.info(message)
}

const httpLogger = morgan(
  'Request: :method  :url Response: :status :res[content-length] - :response-time ms',
  { stream }
)

export default httpLogger
