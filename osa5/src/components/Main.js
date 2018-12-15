import React from 'react'
import Notification from './Notification'
import NewBlogForm from './NewBlogForm'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { user, user_loading, user_loading_error, blogs, blogs_loading } = this.props

        // Loading
        if (user_loading || blogs_loading){
            return (
                <div className='container'>
                    <h2>Loading...</h2>
                </div>
            )
        }

        // Authentication error
        if (user_loading_error){
            this.props.showNotification('käyttäjätunnus tai salasana virheellinen', 'error', false)
        }

        // User not authenticated
        if (user === null) {
            return (
                <div className='container'>
                    <Notification/>
                    <h2>Log in to application</h2>
                    {this.menu()}
                </div>
            )
        }

        // Sort blogs
        let blogsCopy = blogs.slice(0)
        blogsCopy.sort(function(a, b){
            return b.likes - a.likes
        })

        // Save user to local storage in order to survive from refresh
        window.localStorage.setItem('authorizedUser', JSON.stringify(user))

        return (
            <div className='container'>
                <h2>blogs</h2>
                {this.menu()}
                <Notification/>

                <br/>
                <h3>create new</h3>
                <NewBlogForm
                    onCreateNewBlog={this.onCreateNewBlog}
                /> <br/>
                <ListGroup>
                    {blogsCopy.map(blog =>
                        <ListGroupItem key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default Main