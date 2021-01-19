import React, { useState } from 'react';
import blogsService from "../services/blogs";


const Blog = ({ blog, onDeleteBlog, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showForOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  };
  const deleteBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      try {
        await blogsService.remove(blog.id)
        onDeleteBlog(blog.id);
      } catch (error) {
        console.error(error);
      }
    }
  }


  const likeBlog = event => {
    if (window.confirm(`Like ${blog.title} ?`)) {
      blog.likes += 1
      blogsService
        .update(blog.id, blog)
        .then(() => {
          blogsService.getAll().then(updatedBlogs => {
            setBlogs(updatedBlogs);
          });
        })
        .catch(error => {
          console.log("Blog does not exist");
        });
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="Blog">
      <div onClick={toggleVisibility} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible} className="BlogContent">
        <br />
        link: {blog.url}
        <br />
        amount of likes: {" "}{blog.likes}
        <button onClick={likeBlog}>like</button>
        <br />
        <button onClick={deleteBlog} style={showForOwner}>delete</button>
      </div>
    </div>


  )
}

export default Blog;