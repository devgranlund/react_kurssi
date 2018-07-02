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
        if (this.props.blog.user){
            return this.props.blog.user.name
        } else {
            return 'initial'
        }
    }
    
    render() {
        console.log(this.props.blog)
        const showWhenVisible = { display: this.state.detailsVisible ? '': 'none'}
        
        return (
            
                <div className="blogStyle" onClick={this.toggleDetails}>
                    {this.props.blog.title} {this.props.blog.author}
                    <div style={showWhenVisible} className="blogInnerStyle">
                        {this.props.blog.url} <br/>
                        {this.props.blog.likes} likes <button>like</button> <br/>
                        added by {this.safeGetUsersName()}
                    </div>
                </div>
        )
    }
}

export default Blog