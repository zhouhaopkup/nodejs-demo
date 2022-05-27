const { createClient } = require('redis')
// const { REDIS_CONF } = require('../conf/db')

const client = createClient()
client.on('err', (err) => {
    console.error('Redis Client Error: ', err)
})
async function start(){
    await client.connect()
}

start()

async function setRedis(key, val) { 
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    await client.set(key, val)
}

async function getRedis(key) {
    const val = await client.get(key)
    if(!val) {
        return null
    }
    try{
        return JSON.parse(val)
    } catch(err) {
        return val
    }
}

module.exports = {
    setRedis,
    getRedis
}

