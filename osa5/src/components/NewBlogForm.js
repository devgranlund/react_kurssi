import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap'

const NewBlogForm = (props) => {
    return (
        <form onSubmit={props.onCreateNewBlog}>
            <FormGroup>
                <ControlLabel>title:</ControlLabel>
                <FormControl
                    type="text"
                    name="blogTitle"
                    value={props.blogTitle}
                    onChange={props.onBlogTitleChange} /> <br/>
                <ControlLabel>author:</ControlLabel>
                <FormControl
                    type="text"
                    name="blogAuthor"
                    value={props.blogAuthor}
                    onChange={props.onBlogAuthorChange} /> <br/>
                <ControlLabel>url:</ControlLabel>
                <FormControl
                    type="text"
                    name="blogUrl"
                    value={props.blogUrl}
                    onChange={props.onBlogUrlChange} /> <br/>
                <Button bsStyle='success' type='submit'>create</Button>
            </FormGroup>
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