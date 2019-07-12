/**
 * Created by ZhangZhiShuo on 2019/4/27 20:13.
 * file description:
 */
import { configure } from 'mobx'

import config from './configureStore'
import app from './setup'

export default function() {
  const stores = config()
  configure({ enforceActions: 'never' })
  return app(stores)
}
