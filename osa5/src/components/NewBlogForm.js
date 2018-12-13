import React from 'react'
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap'

class NewBlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogTitle: '',
            blogAuthor: '',
            blogUrl: ''
        }
    }

    onFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onCreateNewBlog(this.state.blogTitle, this.state.blogAuthor, this.state.blogUrl)
        this.setState({ blogTitle: '', blogAuthor: '', blogUrl: '' })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>title:</ControlLabel>
                    <FormControl
                        type="text"
                        name="blogTitle"
                        value={this.state.blogTitle}
                        onChange={this.onFieldChange} /> <br/>
                    <ControlLabel>author:</ControlLabel>
                    <FormControl
                        type="text"
                        name="blogAuthor"
                        value={this.state.blogAuthor}
                        onChange={this.onFieldChange} /> <br/>
                    <ControlLabel>url:</ControlLabel>
                    <FormControl
                        type="text"
                        name="blogUrl"
                        value={this.state.blogUrl}
                        onChange={this.onFieldChange} /> <br/>
                    <Button bsStyle='success' type='submit'>create</Button>
                </FormGroup>
            </form>
        )}
}

export default NewBlogForm