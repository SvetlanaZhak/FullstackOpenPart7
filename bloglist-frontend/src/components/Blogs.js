import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, onDeleteBlog, setBlogs, user }) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    return sortedBlogs.map((blog, index) => (
        <Blog key={index} blog={blog} onDeleteBlog={onDeleteBlog} setBlogs={setBlogs} user={user} />
    ));
};
export default Blogs;