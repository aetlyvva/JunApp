import { observable } from 'mobx'
import URL from '../src/env'

export default class findStore {
  @observable friendList = []
  @observable dynamicList = []
  getFriendList = async account => {
    try {
      const response = await fetch(`${URL}/getFriends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account })
      })
      const data = await response.json()
      this.friendList = data
    } catch (e) {
      console.warn(e)
    }
  }
  addFriend = async (uid, text) => {
    try {
      const userDataJson = await fetch(`${URL}/addFriends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid, text })
      })
      if (userDataJson.status === 500) {
        const a = await userDataJson.json()
        alert(a.message)
      } else {
        return true
      }
    } catch (e) {
      console.warn(e)
    }
  }
  deleteFriend = async (account, friendUid) => {
    try {
      await fetch(`${URL}/deleteFriends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account, friendUid })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  deleteComment = async commentNum => {
    try {
      await fetch(`${URL}/deleteComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentNum })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  addComment = async (dynamicNum, name, commentText, chatName) => {
    try {
      await fetch(`${URL}/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dynamicNum, name, commentText, chatName })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  getDynamic = async account => {
    try {
      const result = await fetch(`${URL}/getDynamic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account })
      })
      const data = await result.json()
      this.dynamicList = data
    } catch (e) {
      console.warn(e)
    }
  }
  deleteDynamic = async dynamicNum => {
    try {
      const result = await fetch(`${URL}/deleteDynamic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dynamicNum })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  upAccount = async formData => {
    try {
      await fetch(`${URL}/upAccount`, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        method: 'POST',
        body: formData
      })
      return true
    } catch (e) {
      console.log(e)
    }
  }
}
