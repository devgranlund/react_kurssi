import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h3>users</h3>
                {this.props.users.size}
                <Table striped>
                    <thead>
                        <tr>
                            <th>user</th>
                            <th>blogs added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user =>
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Users