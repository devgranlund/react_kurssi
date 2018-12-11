import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { login , setUser } from './reducers/userReducer'


class App extends React.Component {
    onFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    login = (username, password) => {
        console.log('login')
        this.props.login(username, password)
            .then(function(result) {
                    window.localStorage.setItem('authorizedUser', JSON.stringify(result))
                    window.location.reload()
                }, result => this.onLoginError()
            )
    }
    logout = (event) => {
        window.localStorage.removeItem('authorizedUser')
    }
    onLoginError = () => {
        this.props.showNotification('käyttäjätunnus tai salasana virheellinen', 'error', false)
    }
    onCreateNewBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.createNewBlog({
                title: this.state.blogTitle,
                author: this.state.blogAuthor,
                url: this.state.blogUrl
            }, this.props.user.token)
            this.setState({ blogTitle:'', blogAuthor:'', blogUrl:'' })
            this.props.showNotification(
                'a new blog ' + blog.title + ' by ' + blog.author + ' added',
                'success', true)
        } catch (exception) {
            this.props.showNotification('error: ' + exception,
                'error', false)
        }
    }
    onBlogLiked = async (blog) => {
        try {
            blog.likes = blog.likes + 1
            const updatedBlog = {
                id: blog.id,
                user: blog.user._id,
                likes: blog.likes,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }
            const response = await blogService.updateBlog(updatedBlog, this.props.user.token)
            this.props.showNotification(
                'blog ' + blog.title + ' by ' + blog.author + ' liked',
                'success', false)
        } catch (exception) {
            this.props.showNotification('error: ' + exception,
                'error', false)
        }
    }
    onBlogDelete = async (blog) => {
        try {
            if (window.confirm('delete ' + blog.title + ' by ' + blog.author)) {
                const response = await blogService.deleteBlog(blog, this.props.user.token)
                console.log(response)
                this.props.showNotification(
                    'blog deleted',
                    'success', true)
            }
        } catch (exception) {
            this.props.showNotification('error: ' + exception,
                'error', false)
        }

    }

    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            blogTitle: '',
            blogAuthor: '',
            blogUrl: '',
            loginVisible: false
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({ blogs })
        )

        const authorizedUser = window.localStorage.getItem('authorizedUser')
        if (authorizedUser !== null && authorizedUser !== 'null') {
            const user = JSON.parse(authorizedUser)
            this.props.setUser(user)
        }
    }

    render() {

        let blogsCopy = this.state.blogs.slice(0)
        blogsCopy.sort(function(a, b){
            return b.likes - a.likes
        })

        if (this.props.user === null) {

            return (
                <div className='container'>
                    <Notification/>
                    <h2>Log in to application</h2>
                    <Togglable buttonLabel='log in'>
                        <LoginForm
                            handleSubmit={this.login}
                        />
                    </Togglable>
                </div>
            )
        }
        // else
        return (
            <div className='container'>
                <h2>blogs</h2>
                <Notification/>
                <form onSubmit={this.logout}>
                    {this.props.user.name} logged in.
                    <button>logout</button>
                </form>
                <br/>
                <h3>create new</h3>
                <NewBlogForm
                    onCreateNewBlog={this.onCreateNewBlog}
                    blogTitle={this.state.blogTitle}
                    onBlogTitleChange={this.onFieldChange}
                    blogAuthor={this.state.blogAuthor}
                    onBlogAuthorChange={this.onFieldChange}
                    blogUrl={this.state.blogUrl}
                    onBlogUrlChange={this.onFieldChange}
                /> <br/>
                <Table striped>
                    <tbody>
                        {blogsCopy.map(blog =>
                            <Blog
                                key={blog._id}
                                blog={blog}
                                onBlogLiked={this.onBlogLiked}
                                onBlogDelete={this.onBlogDelete}
                                user={this.props.user}
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
    }
}

const ConnectedApp = connect(mapStateToProps, { showNotification, login, setUser })(App)

export default ConnectedApp
