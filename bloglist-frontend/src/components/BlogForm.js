import React, { useState } from 'react';
import blogsService from '../services/blogs';



const BlogForm = ({ blogs, onBlogSuccess, onError, user }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");

  const onTitleChange = event => {
    setNewTitle(event.target.value);
  };
  const onAuthorChange = event => {
    setNewAuthor(event.target.value);
  };
  const onUrlChange = event => {
    setNewUrl(event.target.value);
  };

  const onLikesChange = event => {
    setNewLikes(event.target.value);
  };



  /// add Blog
  const addBlog = async event => {
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      user,
    };
    blogsService.create(blog).then(createdBlog => {

      createdBlog.user = user;
      onBlogSuccess(blogs.concat(createdBlog), `A new blog ${newTitle} by ${newAuthor} added`);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setNewLikes("");
    }).catch(error => {
      onError(error.response.data.error)
    })

  };
  const findExistingBlog = newTitle => {
    return blogs.find(blog => blog.title === newTitle);
  };

  //update blog info
  const updateBlog = (titleMatch, blogObject) => {
    if (
      window.confirm(
        `${blogObject.title} is already added to the list, replace the old blog with the new one?`
      )
    ) {
      const errorString = `Maybe ${blogObject.title}' has already been removed from server`;
      blogsService
        .update(titleMatch.id, blogObject)
        .then(() => {
          blogsService
            .getAll()
            .then(updatedBlogs => {
              onBlogSuccess(
                updatedBlogs,
                `Updated ${blogObject.title}'s info`
              );
            })
            .catch(error => {

              onError(errorString);
            });
        })
        .catch(error => {

          onError(error.response.data.error);
        });
    } else {
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setNewLikes("");
    }
  };

  //handle data
  const handleData = event => {



    event.preventDefault();
    const titleObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    };

    const blogMatch = findExistingBlog(newTitle);
    blogMatch === undefined
      ? addBlog(titleObject)
      : updateBlog(blogMatch, titleObject);

  };

  return (
    <div>
      <form onSubmit={handleData}>
        <div>
          title <input value={newTitle} onChange={onTitleChange} />
        </div>
        <div>
          author: <input value={newAuthor} onChange={onAuthorChange} />
        </div>
        <div>
          url: <input value={newUrl} onChange={onUrlChange} />
        </div>
        <div>
          likes: <input value={newLikes} onChange={onLikesChange} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default BlogForm;