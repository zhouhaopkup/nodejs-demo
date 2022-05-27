// const redis = require('redis')

// // 创建客户端
// const redisClient = redis.createClient(6379, '127.0.0.1')
// redisClient.on('error', err => {
//     console.log(err)
// })

// //测试
// redisClient.set('myname', 'zhangsan2', redis.print)
// redisClient.get('myname', (err, val) => {
//     if(err) {
//         console.error(err)
//         return
//     }
//     console.log('val: ', val)

//     // 退出
//     redisClient.quit()
// })

const { createClient } = require('redis')
const client = createClient()
client.on('err', (err) => {
    console.error('Redis Client Error: ', err)
})

async function testRedis() {
    await client.connect()

    await client.set('myname', 'zhangsan')
    const val = await client.get('myname')

    console.log('val: ', val)
    client.quit()
}

testRedis()




