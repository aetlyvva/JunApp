const sql = require('mssql')
const _ = require('loadsh')
const getFriends = async response => {
  {
    try {
      const result = await sql.query`select * from Friends where uid=(${response})`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const searchFriends = async response => {
  {
    try {
      const result = await sql.query`select name,img,uid from Friends where uid=(${response})`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addFriends = async response => {
  const result1 = await sql.query`select * from account where uid=(${response.friendUid})`
  const result2 = await sql.query`select * from Friends where uid=(${response.uid}) and friendUid=(${
    response.friendUid
  })`
  if (result1.recordset.length > 0) {
    if (response.friendUid !== response.uid) {
      if (result2.recordset.length <= 0) {
        await sql.query`insert into Friends(uid,friendUid,friendName,img) values (${response.uid},${
          result1.recordset[0].uid
        },${result1.recordset[0].name},${result1.recordset[0].img})`
      } else {
        throw '已关注该好友'
      }
    } else {
      throw '您不能关注自己'
    }
  } else {
    throw '该id不存在'
  }
}
const deleteFriends = async response => {
  {
    try {
      await sql.query`delete from Friends where uid=(${response.uid}) and friendUid=(${response.friendUid})`
    } catch (e) {
      console.log(e)
    }
  }
}

//动态接口的实现
const getDynamic = async response => {
  try {
    const friendUid = await sql.query`select friendUid from Friends where uid=(${response})`

    let arr = []
    const myDynamic = await sql.query`select uid,dynamicName,photograph,text,img,dynamic.dynamicNum,date,commentNum,name,commentText,chatName from dynamic full outer join comment on dynamic.dynamicNum=comment.dynamicNum where uid=(${response}) order by dynamic.dynamicNum desc`
    for (let i = 0; i < friendUid.recordset.length; i++) {
      const friendDynamic = await sql.query`select uid,dynamicName,photograph,text,img,dynamic.dynamicNum,date,commentNum,name,commentText,chatName from dynamic full outer join comment on dynamic.dynamicNum=comment.dynamicNum where uid=(${
        friendUid.recordset[i].friendUid
      }) order by dynamic.dynamicNum desc`
      arr = arr.concat(friendDynamic.recordset)
    }
    const result = _.sortBy(myDynamic.recordset.concat(arr), ['dynamicNum']).reverse()

    let data = []
    for (let item of result) {
      let isExisted = false
      for (let dataItem of data) {
        if (dataItem.dynamicNum === item.dynamicNum) {
          dataItem.commentList.push({
            commentNum: item.commentNum,
            name: item.name,
            chatName: item.chatName,
            commentText: item.commentText
          })
          isExisted = true
          break
        }
      }
      if (!isExisted) {
        data.push({
          dynamicName: item.dynamicName,
          photograph: item.photograph,
          text: item.text,
          img: item.img.split(';'),
          dynamicNum: item.dynamicNum,
          date: item.date,
          commentList: item.commentNum
            ? [{ commentNum: item.commentNum, name: item.name, chatName: item.chatName, commentText: item.commentText }]
            : []
        })
      }
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

const addDynamic = async response => {
  const dynamicNum = new Date().getTime().toString()
  const img = response.img.join(';')
  try {
    const result = await sql.query`select name,img from account where uid=(${response.uid})`
    await sql.query`insert into dynamic(uid,dynamicName,photograph,text,img,dynamicNum,date) values (${response.uid},${
      result.recordset[0].name
    },${result.recordset[0].img},${response.text},${img},${dynamicNum},${response.date})`
  } catch (e) {
    console.log(e)
  }
}
const deleteDynamic = async response => {
  {
    try {
      await sql.query`delete from dynamic where dynamicNum=(${response})`
      await sql.query`delete from comment where dynamicNum=(${response})`
    } catch (e) {
      console.log(e)
    }
  }
}

//评论接口的实现
const getComment = async response => {
  {
    try {
      const result = await sql.query`select * from comment where dynamicNum=(${response.uid}) order by commentNum desc`
      return result
    } catch (e) {
      console.log(e)
    }
  }
}
const addComment = async response => {
  const commentNum = new Date().getTime().toString()
  try {
    await sql.query`insert into comment(dynamicNum,commentNum,name,commentText,chatName) values (${
      response.dynamicNum
    },${commentNum},${response.name},${response.commentText},${response.chatName})`
  } catch (e) {
    console.log(e)
  }
}
const deleteComment = async response => {
  {
    try {
      await sql.query`delete from comment where commentNum=(${response})`
    } catch (e) {
      console.log(e)
    }
  }
}
const upAccount = async response => {
  {
    try {
      await sql.query`update account set name=${response.name},img=${response.image} where uid=${response.uid}`
      await sql.query`update dynamic set dynamicName=${response.name},photograph=${response.image} where uid=${
        response.uid
      }`
      await sql.query`update Friends set FriendName=${response.name},img=${response.image} where friendUid=${
        response.uid
      }`
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = {
  getFriends,
  addFriends,
  searchFriends,
  deleteFriends,
  getDynamic,
  addDynamic,
  deleteDynamic,
  getComment,
  addComment,
  deleteComment,
  upAccount
}
