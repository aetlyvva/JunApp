/**
 * Created by ZhangZhiShuo on 2019/4/27 20:19.
 * file description:
 */
import { observable } from 'mobx'
import URL from '../src/env'
import { inject } from 'mobx-react'

export default class TableStore {
  @observable totalCourses = []
  @observable tableList = {
    Mon: [],
    Tus: [],
    Wes: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  }
  @observable curWeek = ''
  @observable curTerm = ''
  @observable momentList = []

  setCurWeek = week => {
    this.curWeek = week
  }
  setCurTerm = term => {
    this.curTerm = term
  }
  setMomentList = data => {
    this.momentList = data
  }

  loadCourses = async account => {
    try {
      const response = await fetch(`${URL}/createdSchedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account })
      })
      const data = await response.json()
      let list = {
        Mon: [],
        Tus: [],
        Wes: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
      }
      for (let item of data) {
        let key = 'Mon'
        switch (item.week) {
          case '一':
            key = 'Mon'
            break
          case '二':
            key = 'Tus'
            break
          case '三':
            key = 'Wes'
            break
          case '四':
            key = 'Thu'
            break
          case '五':
            key = 'Fri'
            break
          case '六':
            key = 'Sat'
            break
          case '日':
            key = 'Sun'
            break
        }
        list[key].push(item)
        this.tableList = list
      }
    } catch (e) {
      console.warn(e)
    }
  }

  async getUserCourseList(account) {
    try {
      const response = await fetch(`${URL}/getSchedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account })
      })

      const data = await response.json()
      let list = {
        Mon: [],
        Tus: [],
        Wes: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
      }
      for (let item of data) {
        let key = 'Mon'
        switch (item.week) {
          case '一':
            key = 'Mon'
            break
          case '二':
            key = 'Tus'
            break
          case '三':
            key = 'Wes'
            break
          case '四':
            key = 'Thu'
            break
          case '五':
            key = 'Fri'
            break
          case '六':
            key = 'Sat'
            break
          case '日':
            key = 'Sun'
            break
        }
        list[key].push(item)
        this.tableList = list
      }
    } catch (e) {
      console.warn(e)
    }
  }
  async deleteSchedule(scheduleNum) {
    try {
      fetch(`${URL}/deleteSchedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scheduleNum })
      }).then(() => {})
    } catch (e) {
      console.warn(e)
    }
  }
  addUserCourse = async course => {
    try {
      await fetch(`${URL}/addSchedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      })
      return true
    } catch (e) {
      console.warn(e)
    }
  }

  getId = async classNum => {
    try {
      const dataJson = await fetch(`${URL}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classNum })
      })
      const data = await dataJson.json()
      return data[0]
    } catch (e) {
      console.warn(e)
    }
  }
}
