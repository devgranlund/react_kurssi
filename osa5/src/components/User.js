import React from 'react'
import { ListGroupItem, ListGroup } from 'react-bootstrap'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
        if (props.user === undefined){
            const userJson = window.localStorage.getItem('user')
            if (userJson !== null && userJson !== 'null') {
                const user = JSON.parse(userJson)
                this.state = { user: user }
            }
        }
    }

    componentDidMount() {

    }

    render() {
        window.localStorage.setItem('user', JSON.stringify(this.state.user))
        return (
            <div>
                <h3>{this.state.user.name}</h3>
                <h4>Added blogs</h4>
                <ListGroup>
                    {this.state.user.blogs.map(blog =>
                        <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default User