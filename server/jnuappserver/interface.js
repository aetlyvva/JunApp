const Dynamic = require('./dynamic')
var app = express()

app.post('/getFriends', async (req, res) => {
  const result = await Dynamic.getFriends(req.body.account)
  res.send(result.recordset)
})
app.post('/addFriends', async (req, res) => {
  const response = {
    friendUid: req.body.friendUid,
    uid: req.body.account,
    friendName: req.body.friendName,
    img: req.body.img
  }
  try {
    const result = await Dynamic.addFriends(response)
    res.send(result.recordset)
  } catch (e) {
    res.status(500)
    res.send({
      message: e,
      error: true
    })
  }
})
app.post('/deleteFriends', async (req, res) => {
  await Dynamic.deleteFriends(req.body.friendUid)
  res.end()
})

//动态接口
app.post('/getDynamic', async (req, res) => {
  const result = await Dynamic.getDynamic(req.body.account)
  res.send(result.recordset)
})
app.post('/addDynamic', async (req, res) => {
  const response = {
    uid: req.body.account,
    dynamicName: req.body.dynamicName,
    photograph: req.body.photograph,
    text: req.body.text,
    img: req.body.img,
    date: req.body.date
  }
  await Dynamic.addDynamic(response)
  res.send(JSON.stringify(response))
})
app.post('/deleteFriends', async (req, res) => {
  await Dynamic.deleteDynamic(req.body.dynamicNum)
  res.end()
})

//评论接口
app.post('/getComment', async (req, res) => {
  const result = await Dynamic.getComment(req.body.dynamicNum)
  res.send(result.recordset)
})
app.post('/addComment', async (req, res) => {
  const response = {
    dynamicNum: req.body.dynamicNum,
    commentNum: req.body.commentNum,
    name: req.body.name,
    commentText: req.body.commentText,
    chatName: req.body.chatName
  }
  await Dynamic.addComment(response)
  res.send(JSON.stringify(response))
})
app.post('/deleteComment', async (req, res) => {
  await Dynamic.deleteComment(req.body.commentNum)
  res.end()
})
