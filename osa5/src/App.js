import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { Table, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { login, setUser, initUsers } from './reducers/userReducer'
import { initBlogs, createBlog, updateBlog, deleteBlog, commentBlog } from './reducers/blogReducer'

class App extends React.Component {
    onFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    login = (username, password) => {
        this.props.login(username, password)
    }
    
    logout = (event) => {
        window.localStorage.removeItem('authorizedUser')
    }
    
    onCreateNewBlog = (blogTitle, blogAuthor, blogUrl) => {
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        this.props.createBlog(newBlog, this.props.user.token)
            .then(result => this.props.showNotification(
                     'a new blog ' + blogTitle + ' by ' + blogAuthor + ' added',
                     'success', true))
            .catch(error => this.props.showNotification('error: ' + error,
                     'error', false))
        
    }
    
    onBlogLiked = (blog) => {
        blog.likes = blog.likes + 1
        const updatedBlog = {
            id: blog.id,
            user: blog.user,
            likes: blog.likes,
            author: blog.author,
            title: blog.title,
            comments: blog.comments,
            url: blog.url
        }
        this.props.updateBlog(updatedBlog, this.props.user.token)
            .then(result => this.props.showNotification(
                'blog ' + updatedBlog.title + ' by ' + updatedBlog.author + ' liked',
                'success', false))
            .catch(error => this.props.showNotification('error: ' + error,
                'error', false))
    }
    
    onBlogDelete = (blog) => {
        if (window.confirm('delete ' + blog.title + ' by ' + blog.author)) {
            this.props.deleteBlog(blog, this.props.user.token)
                .then(result => this.props.showNotification(
                    'blog deleted',
                    'success', true))
                .catch(error => this.props.showNotification('error: ' + error,
                    'error', false))
        }
    }
    
    onBlogCommented = (blog, comment) => {
        console.log('onBlogCommented: ', blog, comment)
        const comments = [...blog.comments, comment]
        const commentedBlog = {
            id: blog.id,
            user: blog.user,
            likes: blog.likes,
            author: blog.author,
            title: blog.title,
            comments: comments,
            url: blog.url
        }
        this.props.commentBlog(commentedBlog, this.props.user.token)
            .then(result => this.props.showNotification(
                'comment ' + comment + 'added to blog' + commentedBlog.title,
                'success', false))
            .catch(error => this.props.showNotification('error: ' + error,
                'error', false))
    }
 
    constructor(props) {
        super(props)
        this.state = {
            loginVisible: false
        }
    }

    componentDidMount() {
        this.props.initBlogs()
        this.props.initUsers()

        const authorizedUser = window.localStorage.getItem('authorizedUser')
        if (authorizedUser !== null && authorizedUser !== 'null') {
             const user = JSON.parse(authorizedUser)
             this.props.setUser(user)
        } else {
             console.error('not authorized')
        }
    }

    userById(id){
        if (this.props.users !== null && this.props.users.length > 0){
            return this.props.users.filter(user => user.id === id)[0]
        } else {
            console.error('users not lodaded correctly')
        }
    }
    
    menu() {
        return (
            <div>
                <Router>
                <div>
                    <div>
                        <Link to='/'>blogs</Link> &nbsp;
                        <Link to='/users'>users</Link> &nbsp;
                        {this.props.user
                            ? <em>{this.props.user.name} logged in <form onSubmit={this.logout}> <Button bsStyle='warning' type='submit'>logout</Button></form></em>
                            : <Link to="/login">login</Link>
                        }
                    </div>
                    
                    <Route exact path="/users" render={() =>
                        this.props.user
                        ? <Users users={this.props.users}/> 
                        : <Redirect to = '/login' />} 
                    />
                    <Route exact path="/users/:id" render={({match}) =>
                        <User user={this.userById(match.params.id)} />}
                    />
                    <Route exact path="/login" render={() => 
                        this.props.user
                        ? <Redirect to = '/' />
                        : <LoginForm handleSubmit={this.login}/>} 
                    />
                </div>    
                </Router>
            </div>
        )
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
                <Table striped>
                    <tbody>
                        {blogsCopy.map(blog =>
                            <Blog
                                key={blog._id}
                                blog={blog}
                                onBlogLiked={this.onBlogLiked}
                                onBlogDelete={this.onBlogDelete}
                                onBlogCommented={this.onBlogCommented}
                                user={user}
                            />
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        user_loading: store.user.user_loading,
        user_loading_error: store.user.user_error,
        users: store.user.users,
        
        blogs: store.blogs.blogs,
        blogs_loading: store.blogs.blogs_loading,
        blogs_loading_error: store.blogs.blogs_error
    }
}

const ConnectedApp = connect(mapStateToProps, { showNotification, login, setUser, initUsers, initBlogs, createBlog, updateBlog, deleteBlog, commentBlog })(App)

export default ConnectedApp
