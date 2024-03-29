import type { CorsOptions } from 'cors'

import Log from '../logger'

const whitelist: string[] = ['http://localhost:3000', 'http://localhost:4000', 'https://pelagic-cocoa-382420.rj.r.appspot.com', 'http://localhost:4200', 'https://mingga.net', 'https://admin-mingga.vercel.app']

const corsConfig = {
  origin: function (origin: string, response: (res: string | null, cont?: boolean) => void) {
    if (true) {
      response(null, true)
    } else {
      Log.error('Origin not allowed ' + origin)
      response('Origin not allowed')
    }
  }
}

export default corsConfig as CorsOptions
