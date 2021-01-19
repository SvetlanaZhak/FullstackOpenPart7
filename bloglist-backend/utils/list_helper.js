const lodash = require("lodash")

const dummy = blogs => {
    blogs = 1
    return blogs
}

const totalLikes = blogs => {
    const reducer = (accumulator, blog) => accumulator + blog.likes;
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    let max = 0
    let bestBlog = {}
    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            bestBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    return bestBlog
}

const mostBlogs = blogs => {
    let totalBlogs = []
    blogs.forEach(blog => {
        const findName = lodash.find(totalBlogs, ["author", blog.author])
        if (findName === undefined) {
            totalBlogs = lodash.concat(totalBlogs, {
                author: blog.author,
                count: 1
            })
        } else {
            const index = lodash.findIndex(totalBlogs, ["author", blog.author])
            totalBlogs[index].count++
        }
    })
    const mostBlogs = lodash.maxBy(totalBlogs, function (o) {
        return o.count
    })
    return mostBlogs
}

const mostLikes = blogs => {
    let totalBlogs = []
    blogs.forEach(blog => {
        const findName = lodash.find(totalBlogs, ["author", blog.author])
        if (findName === undefined) {
            totalBlogs = lodash.concat(totalBlogs, {
                author: blog.author,
                likes: blog.likes
            })
        } else {
            const index = lodash.findIndex(totalBlogs, ["author", blog.author])
            totalBlogs[index].likes = totalBlogs[index].likes + blog.likes
        }
    })
    const mostLikes = lodash.maxBy(totalBlogs, function (o) { return o.likes })
    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}