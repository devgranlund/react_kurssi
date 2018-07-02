import React from 'react'

class Blog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            detailsVisible: false
        }
    }

    toggleDetails = () => {
        this.setState({detailsVisible: !this.state.detailsVisible})
    }

    safeGetUsersName = () => {
        if (this.props.blog.user) {
            return this.props.blog.user.name
        } else {
            return 'initial'
        }
    }

    handleClick = (blog) => {
        this.props.onBlogLiked(blog)
    }
    
    handleDeleteClick = (blog) => {
        this.props.onBlogDelete(blog)
    }

    render() {
        
        const showWhenVisible = {display: this.state.detailsVisible ? '' : 'none'}

        return (
            <div className="blogStyle" onClick={this.toggleDetails}>
                {this.props.blog.title} {this.props.blog.author}
                <div style={showWhenVisible} className="blogInnerStyle">
                    {this.props.blog.url} <br/>
                    {this.props.blog.likes} likes <button onClick={() => this.handleClick(this.props.blog)}>like</button> <br/>
                    added by {this.safeGetUsersName()} <br/>
                    <button onClick={() => this.handleDeleteClick(this.props.blog)}>delete</button>
                </div>
            </div>
        )
    }
}

export default Blog