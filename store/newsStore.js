import { observable } from 'mobx'
import URL from '../src/env.js'
import Utils from '../src/utils/Utils'
import Base64Utils from '../src/utils/Base64'
import Toast from '@remobile/react-native-toast'
export default class newsStore {
  @observable newsList = []
  @observable newsImgList = {}
  @observable ActivityList = []
  @observable courseList = []

  async getNewsList() {
    try {
      const response = await fetch(`${URL}/getNews`)
      const data = await response.json()
      this.newsList = data
    } catch (e) {
      console.warn(e)
    }
  }
  async getNewsImg() {
    try {
      const response = await fetch(`${URL}/getNewsImg`)
      const data = await response.json()
      this.newsImgList = data
    } catch (e) {
      console.warn(e)
    }
  }
  upNewsImg = async formData => {
    try {
      await fetch(`${URL}/upNewsImg`, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        method: 'POST',
        body: formData
      })
    } catch (e) {
      console.warn(e)
    }
  }
  async deleteNews(newsNum) {
    try {
      fetch(`${URL}/deleteNews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsNum })
      }).then(() => {})
    } catch (e) {
      console.warn(e)
    }
  }
  addNews = async news => {
    try {
      await fetch(`${URL}/addNews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(news)
      })
    } catch (e) {
      console.warn(e)
    }
  }
  upLoad = async formData => {
    try {
      await fetch(`${URL}/upData`, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        method: 'POST',
        body: formData
      })
    } catch (e) {
      console.warn('a', e.message)
    }
  }
  async getActivityList() {
    try {
      const response = await fetch(`${URL}/getActivity`)
      const data = await response.json()
      this.ActivityList = data
    } catch (e) {
      console.warn(e)
    }
  }
  async deleteActivity(ActivityNum) {
    try {
      fetch(`${URL}/deleteActivity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ActivityNum })
      }).then(() => {})
    } catch (e) {
      console.warn(e)
    }
  }
  upActivity = async formData => {
    try {
      await fetch(`${URL}/upActivity`, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        method: 'POST',
        body: formData
      })
    } catch (e) {
      console.warn('a', e.message)
    }
  }

  async getCourseList() {
    try {
      const response = await fetch(`${URL}/getCourse`)
      const data = await response.json()
      this.courseList = data
    } catch (e) {
      console.warn(e)
    }
  }
  async deleteCourse(classNum) {
    try {
      fetch(`${URL}/deleteCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classNum })
      }).then(() => {})
    } catch (e) {
      console.warn(e)
    }
  }
  upCourse = async formData => {
    try {
      const userDataJson = await fetch(`${URL}/upCourse`, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        method: 'POST',
        body: formData
      })
      if (userDataJson.status === 500) {
        const a = await userDataJson.json()
        alert(a.message)
      } else {
        return true
      }
    } catch (e) {
      console.warn('a', e.message)
    }
  }
}
