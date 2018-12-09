import React from 'react'

class Blog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            detailsVisible: false
        }
    }

    toggleDetails = () => {
        this.setState({ detailsVisible: !this.state.detailsVisible })
    }

    safeGetUsersName = () => {
        if (this.props.blog.user) {
            return this.props.blog.user.name
        } else {
            return 'initial'
        }
    }

    handleLikeClick = (blog) => {
        this.props.onBlogLiked(blog)
    }

    handleDeleteClick = (blog) => {
        this.props.onBlogDelete(blog)
    }

    renderDeleteButton = () => {
        if (this.props.user === null){
            return ''
        } else if ((this.props.blog.user !== null) && (this.props.blog.user !== undefined) && (this.props.user.id !== this.props.blog.user._id)) {
            return ''
        } else {
            return <button onClick={() => this.handleDeleteClick(this.props.blog)}>delete</button>
        }
    }

    render() {
        const showWhenVisible = { display: this.state.detailsVisible ? '' : 'none' }
        return (
            <tr className="blogStyle" onClick={this.toggleDetails}>
                <td>
                    {this.props.blog.title} {this.props.blog.author}
                    <div style={showWhenVisible} className="blogInnerStyle">
                        {this.props.blog.url} <br/>
                        {this.props.blog.likes} likes <button onClick={() => this.handleLikeClick(this.props.blog)}>like</button> <br/>
                    added by {this.safeGetUsersName()} <br/>
                        {this.renderDeleteButton()}
                    </div>
                </td>
            </tr>
        )
    }
}

export default Blog