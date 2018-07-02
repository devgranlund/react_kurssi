import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable"

class App extends React.Component {
    onFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            this.setState({username: '', password: '', user})
            window.localStorage.setItem('authorizedUser', JSON.stringify(user))
        } catch (exception) {
            this.showNotification('käyttäjätunnus tai salasana virheellinen', 
                'error', false)
        }
    }
    logout = (event) => {
        window.localStorage.removeItem('authorizedUser')
    }
    onCreateNewBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.createNewBlog({
                title: this.state.blogTitle,
                author: this.state.blogAuthor,
                url: this.state.blogUrl
            }, this.state.user.token)
            this.setState({blogTitle:'', blogAuthor:'', blogUrl:''})
            this.showNotification(
                'a new blog ' + blog.title + ' by ' + blog.author + ' added',
                'success', true)
        } catch (exception) {
            this.showNotification('error: ' + exception, 
                'error', false)
        }
    }
    onBlogLiked = async (blog) => {
        try {
            blog.likes = blog.likes + 1
            blog.user = this.state.user.id
            const response = await blogService.updateBlog(blog, this.state.user.token)
            this.showNotification(
                'blog ' + blog.title + ' by ' + blog.author + ' liked',
                'success', true)
        } catch (exception) {
            this.showNotification('error: ' + exception,
                'error', false)
        }
    }
    onBlogDelete = async (blog) => {
        try {
            if (window.confirm("delete " + blog.title + " by " + blog.author)) {
                const response = await blogService.deleteBlog(blog, this.state.user.token)
                console.log(response)
                this.showNotification(
                    'blog deleted',
                    'success', true)
            }
        } catch (exception) {
            this.showNotification('error: ' + exception,
                'error', false)
        }
        
    }
    showNotification = ( message , cssClass, reload) => {
        this.setState({
            message: message,
            cssClass: cssClass
        })
        setTimeout(() => {
            this.setState({
                message: null,
                cssClass: ''
            })
            if (reload) {
                window.location.reload()
            }
        }, 5000)
    }

    constructor(props) {
        super(props)
        this.state = {
            message: null,
            cssClass: '',
            username: '',
            password: '',
            user: null,
            blogs: [],
            blogTitle: '',
            blogAuthor: '',
            blogUrl: '',
            loginVisible: false
        }
    }
    
    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({blogs})
        )
        
        const authorizedUser = window.localStorage.getItem('authorizedUser')
        if (authorizedUser) {
            const user = JSON.parse(authorizedUser)
            this.setState({user})
        }
    }

    render() {
        
        let blogsCopy = this.state.blogs.slice(0)
        blogsCopy.sort(function(a, b){
            return b.likes - a.likes
        })
        
        if (this.state.user === null) {
            
            return (
                <div>
                    <Notification
                        message={this.state.message}
                        cssClass={this.state.cssClass}/>
                    <h2>Log in to application</h2>
                    <Togglable buttonLabel='log in'>
                        <LoginForm
                            handleSubmit={this.login}
                            username={this.state.username} 
                            password={this.state.password} 
                            onFieldChange={this.onFieldChange}
                        />
                    </Togglable>
                </div>
            );
        }
        // else
        return (
            <div>
                <h2>blogs</h2>
                <Notification
                    message={this.state.message}
                    cssClass={this.state.cssClass}/>
                <form onSubmit={this.logout}>
                    {this.state.user.name} logged in.
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
                {blogsCopy.map(blog =>
                    <Blog 
                        key={blog._id} 
                        blog={blog}
                        onBlogLiked={this.onBlogLiked}
                        onBlogDelete={this.onBlogDelete}
                    />
                )}
            </div>
        );
    }
}

export default App;
