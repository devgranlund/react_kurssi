import React from 'react'
import PropTypes from 'prop-types'

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

NewBlogForm.propTypes = {
    blogTitle: PropTypes.string.isRequired,
    onBlogTitleChange: PropTypes.func.isRequired,
    blogAuthor: PropTypes.string.isRequired,
    onBlogAuthorChange: PropTypes.func.isRequired,
    blogUrl: PropTypes.string.isRequired,
    onBlogUrlChange: PropTypes.func.isRequired
}

export default NewBlogForm