const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "The 25 Drinks of a Sober Holiday Season",
        author: "Richie Crowley",
        url: "https://heated.medium.com/the-24-drinks-of-a-sober-holiday-season-392cd601a328",
        likes: 1400

    },
    {
        title: "The Heated Holiday Gift Guide",
        author: "Mark Bittman",
        url: "https://heated.medium.com/the-heated-holiday-gift-guide-f619f47cee3c",
        likes: 127
    }

]

const nonExistingId = async () => {
    const blog = new Blog({ title: "jhjhkhk", author: "jjhkjh", url: "jjkjkhjkh" })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}