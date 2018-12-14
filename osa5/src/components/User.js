import React from 'react'
import { ListGroupItem, ListGroup } from 'react-bootstrap'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <h3>{this.props.user.name}</h3>
                <h4>Added blogs</h4>
                <ListGroup>
                    {this.props.user.blogs.map(blog =>
                        <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

export default User