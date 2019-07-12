const Server = require('./server')
const Dynamic = require('./dynamic')
//引入express中间件
var express = require('express')
//Post方式请求参数放在请求体里面，需引用body-parser解析body
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()
var fs = require('fs')
var moment = require('moment')
app.use('/public', express.static(__dirname + '/public'))

//指定启动服务器到哪个文件夹
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//登录注册的接口
app.post('/register', async (req, res, next) => {
  const response = {
    uid: req.body.account,
    password: req.body.password,
    name: req.body.userName
  }
  try {
    await Server.register(response)
    res.end()
  } catch (e) {
    res.status(500)
    res.send({
      message: e,
      error: true
    })
  }
})
app.post('/SignIn', async (req, res, next) => {
  const response = {
    uid: req.body.account,
    password: req.body.password
  }
  try {
    const result = await Server.SignIn(response)
    res.send(result.recordset[0])
  } catch (e) {
    res.status(500)
    res.send({
      message: e,
      error: true
    })
  }
})

//校园公告的接口
app.get('/getNews', async (req, res) => {
  const result = await Server.getNews()
  res.send(result.recordset)
})
app.get('/getNewsImg', async (req, res) => {
  const result = await Server.getNewsImg()
  res.send(result.recordset[0])
})
app.post('/addNews', async (req, res) => {
  const response = {
    title: req.body.title,
    text: req.body.text,
    date: req.body.date
  }
  await Server.addNews(response)
  res.send(JSON.stringify(response))
})

app.post('/deleteNews', async (req, res) => {
  console.log('req', req.body.newsNum)
  await Server.deleteNews(req.body.newsNum)
  res.end()
})
app.post('/upNewsImg', upload.single('file', 9), async (req, res) => {
  var file = req.file
  fs.writeFileSync(`public/${file.originalname}`, fs.readFileSync(file.path))
  const response = {
    image: file.originalname
  }
  await Server.addNewsImg(response)
  res.end() //返回信息自己定义
})
//动态上传图片接口
app.post('/upData', upload.array('file', 9), async (req, res) => {
  var files = req.files
  let images = []
  files.forEach(file => {
    images.push(file.originalname)
    fs.writeFileSync(`public/${file.originalname}`, fs.readFileSync(file.path))
  })
  const response = {
    uid: req.body.account,
    text: req.body.content,
    img: images,
    date: moment().format('MM/DD HH:mm')
  }
  await Dynamic.addDynamic(response)
  res.end() //返回信息自己定义
})
//社团活动接口
app.get('/getActivity', async (req, res) => {
  const result = await Server.getActivity()
  res.send(result.recordset)
})
app.post('/deleteActivity', async (req, res) => {
  console.log('req', req.body.ActivityNum)
  await Server.deleteActivity(req.body.ActivityNum)
  res.end()
})
app.post('/upActivity', upload.single('file', 9), async (req, res) => {
  var file = req.file
  fs.writeFileSync(`public/${file.originalname}`, fs.readFileSync(file.path))
  const response = {
    title: req.body.title,
    text: req.body.text,
    image: file.originalname
  }
  await Server.addActivity(response)
  res.end() //返回信息自己定义
})
//课程列表接口
app.get('/getCourse', async (req, res) => {
  const result = await Server.getCourse()
  res.send(result.recordset)
})
app.post('/deleteCourse', async (req, res) => {
  await Server.deleteCourse(req.body.classNum)
  res.end()
})
app.post('/upCourse', upload.single('file', 9), async (req, res, next) => {
  var file = req.file
  fs.writeFileSync(`public/${file.originalname}`, fs.readFileSync(file.path))
  const response = {
    className: req.body.className,
    place: req.body.place,
    classNum: req.body.classNum,
    classTime: req.body.classTime,
    week: req.body.week,
    totalTeacher: req.body.totalTeacher,
    image: file.originalname
  }
  try {
    await Server.addCourse(response)
    res.end()
  } catch (e) {
    res.status(500)
    res.send({
      message: e,
      error: true
    })
  }
})

//课程表接口
app.post('/getSchedule', async (req, res) => {
  const result = await Server.getSchedule(req.body.account)
  res.send(result.recordset)
})
app.post('/addSchedule', async (req, res) => {
  const response = {
    uid: req.body.account,
    className: req.body.className,
    place: req.body.place,
    classNum: req.body.classNum,
    classTime: req.body.classTime,
    week: req.body.week,
    totalTeacher: req.body.totalTeacher
  }
  await Server.addSchedule(response)
  res.send(JSON.stringify(response))
})
app.post('/deleteSchedule', async (req, res) => {
  console.log('req', req.body.scheduleNum)
  await Server.deleteSchedule(req.body.scheduleNum)
  res.end()
})
app.post('/update', async (req, res, next) => {
  try {
    const result = await Server.update(req.body.classNum)
    res.send(result.recordset)
  } catch (e) {
    console.log(e)
  }
})
app.post('/createdSchedule', async (req, res) => {
  const result = await Server.getCreatedSchedule(req.body.account)
  res.send(result.recordset)
})
//分割线
app.post('/')
app.post('/getFriends', async (req, res) => {
  const result = await Dynamic.getFriends(req.body.account)
  res.send(result.recordset)
})
app.post('/addFriends', async (req, res) => {
  const response = {
    uid: req.body.uid,
    friendUid: req.body.text
  }
  try {
    await Dynamic.addFriends(response)
    res.end()
  } catch (e) {
    console.warn(e.message)
    res.status(500)
    res.send({
      message: e,
      error: true
    })
  }
})
app.post('/deleteFriends', async (req, res) => {
  const response = {
    uid: req.body.account,
    friendUid: req.body.friendUid
  }
  await Dynamic.deleteFriends(response)
  res.end()
})

//动态接口
app.post('/getDynamic', async (req, res) => {
  const result = await Dynamic.getDynamic(req.body.account)
  res.send(result)
})

app.post('/deleteDynamic', async (req, res) => {
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

//个人中心接口
app.post('/upAccount', upload.single('file', 9), async (req, res) => {
  var file = req.file
  fs.writeFileSync(`public/${file.originalname}`, fs.readFileSync(file.path))
  const response = {
    uid: req.body.account,
    name: req.body.name,
    image: file.originalname
  }
  await Dynamic.upAccount(response)
  res.end() //返回信息自己定义
})

//监听端口为3000
var server = app.listen(3000, async () => {
  var host = server.address().address
  var port = server.address().port
  await Server.connectSQL()
  console.log('Example app listening at http://%s:%s', host, port)
})
