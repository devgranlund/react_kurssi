import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            username: '',
            password: '',
            user: null,
            blogs: []
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
            this.setState({
                error: 'käyttäjätunnus tai salasana virheellinen',
            })
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    logout = async (event) => {
        window.localStorage.removeItem('authorizedUser')
    }

    render() {
        if (this.state.user === null) {
            return (
                <div>
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
                    <Notification
                        message={this.state.error}
                        cssClass={'error'}/>
                </div>
            );
        }
        // else
        return (
            <div>
                <h2>blogs</h2>
                <form onSubmit={this.logout}>
                    {this.state.user.name} logged in.
                    <button>logout</button>
                </form>
                <br/><br/>
                {this.state.blogs.map(blog =>
                    <Blog key={blog._id} blog={blog}/>
                )}
            </div>
        );
    }
}

export default App;
