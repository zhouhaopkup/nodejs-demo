const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回promise
    return exec(sql)

    // 先返回假数据(格式是正确的)
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1653298124978,
    //         author: 'zhangsan'
    //     },
    //     {
    //         id: 1,
    //         title: '标题B',
    //         content: '内容B',
    //         createTime: 1653298171069,
    //         author: 'lisi'
    //     },
    // ]
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
    // 先返回假数据
    // return {
    //     id: 1,
    //     title: '标题A',
    //     content: '内容A',
    //     createTime: 1653298124978,
    //     author: 'zhangsan'
    // }
}

const newBlog = ( blogData = {} ) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs(title, content, createtime, author)
        values('${title}','${content}',${createTime},'${author}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
    // return {
    //     id: 3 // 表示新建博客，插入到数据表里面的 id
    // }
}

const updateBlog = (id, blogData = {}) => {
    const title = xss(blogData.title) 
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        return updateData.affectedRows > 0
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(delData => {
        return delData.affectedRows > 0
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}