const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Content-Type', 'application/json;charest=utf-8')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.listen(8081, () => {
  console.log('http://127.0.0.1:8081')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'NoteBook'
})

// 验证token
app.use((req, res, next) => {
  if (req.url == '/api/login') return next()
  const token = req.headers.authorization
  const secretOrPrivateKey = 'ss'
  if (token === 'null')
    return res.json({
      code: 111,
      message: 'token不存在!'
    })
  jwt.verify(token, secretOrPrivateKey, (err, results) => {
    if (err)
      return res.json({
        code: 222,
        data: err,
        message: '无效token!'
      })
    next()
  })
})

//用户登录
app.post('/api/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const sqlStr = `SELECT * FROM users WHERE username='${username}'`
  conn.query(sqlStr, (err, results) => {
    if (err) return
    if (results.length === 0)
      return res.json({
        code: 888,
        message: '用户名不存在!'
      })
    conn.query(
      `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
      (err, results) => {
        if (err) return
        if (results.length === 0)
          return res.json({
            code: 999,
            message: '密码错误!'
          })
        // 生成token
        const content = {
          name: username,
          pwd: password
        }
        const secretOrPrivateKey = 'ss'
        const token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: '8h'
        })
        results[0].token = token
        res.json({
          code: 200,
          message: '登录成功!',
          data: results[0]
        })
      }
    )
  })
})
//获取分类列表
app.post('/api/getclasslist', (req, res) => {
  const keyWord = req.body.keyWord
  const sqlStr = `SELECT * FROM class WHERE is_del=0 AND class_name LIKE '%${keyWord}%'`
  conn.query(sqlStr, (err, results) => {
    if (err)
      return err.json({
        code: 777,
        message: '获取分类列表失败!'
      })
    return res.json({
      code: 200,
      message: '获取分类列表成功!',
      data: results
    })
  })
})
//添加分类
app.post('/api/addClass', (req, res) => {
  const className = req.body.className
  const sqlStr = `INSERT INTO class (class_name) VALUE ('${className}')`
  if (className.length == 0)
    return res.json({
      code: 666,
      message: '分类名不能为空!'
    })
  conn.query(sqlStr, (err, results) => {
    if (err)
      return res.json({
        code: 777,
        message: '添加分类失败!'
      })
    return res.json({
      code: 200,
      message: '添加分类成功!'
    })
  })
})
// 修改分类
app.post('/api/editClass', (req, res) => {
  const id = req.body.classId
  const className = req.body.className
  const sqlStr = `UPDATE class SET class_name='${className}' WHERE id='${id}'`
  conn.query(sqlStr, (err, results) => {
    if (err)
      return res.json({
        code: 777,
        message: '修改分类失败!'
      })
    res.json({
      code: 200,
      message: '修改分类成功!'
    })
  })
})
// 删除分类
app.post('/api/deleteClass', (req, res) => {
  const id = req.body.classId
  const sqlStr = `UPDATE class SET is_del=1 WHERE id='${id}'`
  conn.query(sqlStr, (err, results) => {
    if (err)
      return res.json({
        code: 777,
        message: '删除分类失败!'
      })
    res.json({
      code: 200,
      message: '删除分类成功!'
    })
  })
})
//获取问题列表
app.post('/api/getquestionslist', (req, res) => {
  const className = req.body.classId
  const pageIndex = req.body.pageIndex
  const pageSize = req.body.pageSize
  const keyWord = req.body.questionSearch
  // console.log(className,pageIndex,pageSize)

  conn.query(
    `SELECT COUNT(1) FROM questions qs LEFT JOIN class cl ON qs.class_name=cl.id WHERE qs.class_name=${className} AND qs.is_del=0 AND question LIKE '%${keyWord}%'`,
    (err, results) => {
      if (err) return
      const total = results[0]['COUNT(1)']
      conn.query(
        `SELECT qs.*,cl.class_name FROM questions qs LEFT JOIN class cl ON qs.class_name=cl.id WHERE qs.class_name=${className} AND qs.is_del=0 AND question LIKE '%${keyWord}%' ORDER BY id DESC LIMIT ${(pageIndex -
          1) *
          pageSize},${pageSize}`,
        // `SELECT * FROM questions WHERE class_name=${className} AND is_del=0`,
        (err, results) => {
          if (err)
            return res.json({
              code: 777,
              message: '获取问题列表失败!'
            })
          res.json({
            code: 200,
            message: '获取问题列表成功!',
            data: results,
            total: total
          })
        }
      )
    }
  )
})

// 添加/修改问题
app.post('/api/addQuestion', (req, res) => {
  const question = req.body.question
  const analyse = req.body.analyse
  const className = req.body.className
  const id = req.body.questionId
  var sqlStr = ''
  if (id) {
    sqlStr = `UPDATE questions SET question='${question}',class_name='${className}',analyse='${analyse}' WHERE id='${id}'`
  } else {
    sqlStr = `INSERT INTO questions SET question='${question}',class_name='${className}',analyse='${analyse}'`
  }
  conn.query(sqlStr, (err, results) => {
    if (err) {
      if (err.errno === 1064) {
        return res.json({
          code: 767,
          message: '请检查代码段是否有单引号(\'\'),请改为双引号("")',
          data: err
        })
      }
      return res.json({
        code: 777,
        message: '添加问题失败!',
        data: err
      })
    }
    res.json({
      code: 200,
      message: '添加问题成功!',
      data: results
    })
  })
})

// 删除问题
app.post('/api/deleteQuestion', (req, res) => {
  const id = req.body.questionId
  const sqlStr = `UPDATE questions SET is_del=1 WHERE id="${id}"`
  conn.query(sqlStr, (err, results) => {
    if (err)
      return res.json({
        code: 777,
        message: '删除问题失败!'
      })
    res.json({
      code: 200,
      message: '删除问题成功!'
    })
  })
})
