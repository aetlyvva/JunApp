const express = require('express')
const app = express()
const sql = require('mssql')

const config = {
  user: 'ZZ',
  password: '123',
  server: 'localhost',
  database: 'jnuappDB',
  option: {
    encrypt: true
  }
}
const test = async () => {
  try {
    const result = await sql.query`select * from account where uid='a'`
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}
//连接数据库
const connectSQL = async () => {
  try {
    await sql.connect(config)
    console.log('success')
  } catch (e) {
    console.log(e)
  }
}
//登陆注册

const register = async response => {
  const result = await sql.query`select uid from account where uid=${response.uid}`
  if (result.recordset.length <= 0) {
    await sql.query`insert into account(uid,password,name,power,img) values (${response.uid},${response.password},${
      response.name
    },0,'badge.jpg')`
  } else {
    throw '账号已经存在'
  }
}
const SignIn = async response => {
  const result = await sql.query`select password from account where uid=${response.uid}`
  if (result.recordset.length > 0) {
    if (response.password === result.recordset[0].password) {
      const data = await sql.query`select * from account where uid=${response.uid}`
      return data
    } else {
      throw '密码错误'
    }
  } else {
    throw '账号不存在'
  }
}

//校园公告接口
const getNews = async () => {
  {
    try {
      const result = await sql.query`select * from news order by newsNum desc`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addNews = async response => {
  {
    const guid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
    const newsNum = new Date().getTime().toString()
    try {
      await sql.query`insert into news(title,text,date,newsNum) values (${response.title},${response.text},${
        response.date
      },${newsNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
const deleteNews = async newsNum => {
  {
    try {
      await sql.query`delete from news where newsNum=(${newsNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
const getNewsImg = async () => {
  {
    try {
      const result = await sql.query`select * from newsImg`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addNewsImg = async response => {
  {
    try {
      await sql.query`update newsImg set img=(${response.image})`
    } catch (e) {
      console.log(e)
    }
  }
}
//社团活动的接口方法实现
const getActivity = async () => {
  {
    try {
      const result = await sql.query`select * from activity order by ActivityNum desc`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addActivity = async response => {
  {
    const guid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
    const ActivityNum = new Date().getTime().toString()
    try {
      await sql.query`insert into activity(title,text,img,ActivityNum) values (${response.title},${response.text},${
        response.image
      },${ActivityNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
const deleteActivity = async ActivityNum => {
  {
    try {
      await sql.query`delete from activity where ActivityNum=(${ActivityNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
//实现默认课程表的口的方法
const getCourse = async () => {
  {
    try {
      const result = await sql.query`select * from course order by classNum desc`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addCourse = async response => {
  const result = await sql.query`select classNum from course where classNum=${response.classNum}`

  if (result.recordset.length <= 0) {
    await sql.query`insert into course(className,place,classNum,classTime,week,totalTeacher,img) values (${
      response.className
    },${response.place},${response.classNum},${response.classTime},${response.week},${response.totalTeacher},${
      response.image
    })`
  } else {
    throw '课程编号与已有课程重复'
  }
}
const deleteCourse = async classNum => {
  try {
    await sql.query`delete from course where classNum=(${classNum})`
  } catch (e) {
    console.log(e)
  }
}
//实现课程表接口的方法
const getSchedule = async response => {
  try {
    const result = await sql.query`select * from schedule where uid=(${response})`
    return result
  } catch (e) {
    console.log(e)
  }
}
const addSchedule = async response => {
  {
    const guid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
    const scheduleNum = new Date().getTime().toString()
    try {
      //scheduleNum为数据库中每列数据添加唯一标识，方便删除
      const result = await sql.query`select * from schedule where uid=(${response.uid}) and week=(${
        response.week
      }) and classTime=(${response.classTime})`
      if (result.recordset.length > 0) {
        await sql.query`delete from schedule where scheduleNum=(${result.recordset[0].scheduleNum})`
      }
      await sql.query`insert into schedule(uid,className,place,classNum,classTime,week,totalTeacher,scheduleNum) values (${
        response.uid
      },${response.className},${response.place},${response.classNum},${response.classTime},${response.week},${
        response.totalTeacher
      },${scheduleNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
const deleteSchedule = async scheduleNum => {
  {
    try {
      await sql.query`delete from schedule where scheduleNum=(${scheduleNum})`
    } catch (e) {
      console.log(e)
    }
  }
}
const update = async response => {
  try {
    const result = await sql.query`select * from course where classNum=(${response})`
    return result
  } catch (e) {
    console.log(e)
  }
}
const getCreatedSchedule = async response => {
  try {
    const result = await sql.query`select * from createdSchedule`
    await sql.query`delete from schedule where uid=(${response})`
    await sql.query`insert into schedule(uid,className,place,classNum,classTime,week,totalTeacher,scheduleNum) values (${response},${
      result.recordset[0].className
    },${result.recordset[0].place},${result.recordset[0].classNum},${result.recordset[0].classTime},${
      result.recordset[0].week
    },${result.recordset[0].totalTeacher},${result.recordset[0].scheduleNum}),(${response},${
      result.recordset[1].className
    },${result.recordset[1].place},${result.recordset[1].classNum},${result.recordset[1].classTime},${
      result.recordset[1].week
    },${result.recordset[1].totalTeacher},${result.recordset[1].scheduleNum}),(${response},${
      result.recordset[2].className
    },${result.recordset[2].place},${result.recordset[2].classNum},${result.recordset[2].classTime},${
      result.recordset[2].week
    },${result.recordset[2].totalTeacher},${result.recordset[2].scheduleNum}),(${response},${
      result.recordset[3].className
    },${result.recordset[3].place},${result.recordset[3].classNum},${result.recordset[3].classTime},${
      result.recordset[3].week
    },${result.recordset[3].totalTeacher},${result.recordset[3].scheduleNum}),(${response},${
      result.recordset[4].className
    },${result.recordset[4].place},${result.recordset[4].classNum},${result.recordset[4].classTime},${
      result.recordset[4].week
    },${result.recordset[4].totalTeacher},${result.recordset[4].scheduleNum})`
    return result
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  test,
  connectSQL,
  getNews,
  addNews,
  deleteNews,
  getNewsImg,
  addNewsImg,
  getActivity,
  addActivity,
  deleteActivity,
  getCourse,
  addCourse,
  deleteCourse,
  register,
  SignIn,
  getSchedule,
  addSchedule,
  deleteSchedule,
  update,
  getCreatedSchedule
}
