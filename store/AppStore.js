import { observable } from 'mobx'
import URL from '../src/env'

export default class AppStore {
  @observable user = {}

  register = async user => {
    try {
      const userDataJson = await fetch(`${URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (userDataJson.status === 500) {
        const a = await userDataJson.json()
        alert(a.message)
      } else {
        return true
      }
    } catch (e) {
      alert(e)
    }
  }
  signIn = async user => {
    try {
      const userDataJson = await fetch(`${URL}/SignIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (userDataJson.status === 500) {
        const a = await userDataJson.json()
        alert(a.message)
      } else {
        const data = await userDataJson.json()
        this.user = data
        return true
      }
    } catch (e) {
      console.warn('err', e)
      alert(e)
    }
  }
}
