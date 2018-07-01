import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";

class App extends React.Component {
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
            blogUrl: ''
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({blogs})
        )
        const auhtorizedUser = window.localStorage.getItem('authorizedUser')
        if (auhtorizedUser) {
            const user = JSON.parse(auhtorizedUser)
            this.setState({user})
        }
    }

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

    render() {
        if (this.state.user === null) {
            return (
                <div>
                    <Notification
                        message={this.state.message}
                        cssClass={this.state.cssClass}/>
                    <h2>Log in to application</h2>
                    <form onSubmit={this.login}>
                        username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onFieldChange}/><br/>
                        password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onFieldChange}/><br/>
                        <button>login</button>
                    </form>
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
                {this.state.blogs.map(blog =>
                    <Blog key={blog._id} blog={blog}/>
                )}
            </div>
        );
    }
}

export default App;
