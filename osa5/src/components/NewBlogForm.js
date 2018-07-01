import React from 'react'

const NewBlogForm = (props) => {
    return (
        <form onSubmit={props.onCreateNewBlog}>
            title: <input
            type="text"
            name="blogTitle"
            value={props.blogTitle}
            onChange={props.onBlogTitleChange} /> <br/>
            author: <input
            type="text"
            name="blogAuthor"
            value={props.blogAuthor}
            onChange={props.onBlogAuthorChange} /> <br/>
            url: <input
            type="text"
            name="blogUrl"
            value={props.blogUrl}
            onChange={props.onBlogUrlChange} /> <br/>
            <button>create</button>
        </form>
    )
}

export default NewBlogForm