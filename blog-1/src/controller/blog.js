const getList = (author, keyword) => {
    // 先返回假数据(格式是正确的)
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1653298124978,
            author: 'zhangsan'
        },
        {
            id: 1,
            title: '标题B',
            content: '内容B',
            createTime: 1653298171069,
            author: 'lisi'
        },
    ]
}

const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1653298124978,
        author: 'zhangsan'
    }
}

const newBlog = ( blogData = {} ) => {
    return {
        id: 3 // 表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id就是要更新博客的id
    // blogData是一个博客对象，包含title content 属性
    return true
}

const delBlog = (id) => {
    // id就是要删除博客的id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}