/**
 * Created by ZhangZhiShuo on 2019/4/27 20:14.
 * file description:
 */
import React from 'react'
import { Provider } from 'mobx-react/native'

import App from 'App'

export default function(stores) {
  return class Setup extends React.Component {
    render() {
      return (
        <Provider {...stores}>
          <App />
        </Provider>
      )
    }
  }
}
