const express = require('express')

// 本次http请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始... ', req.method, req.url)
    next()
})
app.use((req, res, next) => {
    //假设在处理cookie
    req.cookie = {
        userId: 'abc123'
    }
    next()
})
app.use((req, res, next) => {
    //假设处理post data
    //异步
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})
app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})
app.post('/api', (req, res, next) => {
    console.log('post /api 路由')
    next()
})

// 模拟登录验证
function loginCheck(req, res, next) {
    // console.log('模拟登录成功')
    // setTimeout(() => {
    //     next()
    // })

    setTimeout(() => {
        console.log('模拟登录失败')
        res.json({
            errno: 0,
            data: req.cookie
        })
        // console.log('模拟登录成功')
        // next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        error: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data')
    res.json({
        error: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理404')
    res.json({
        error: -1,
        msg: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})

