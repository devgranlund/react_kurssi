import React from 'react'
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state.username, this.state.password)
        this.setState({ username: '', password: '' })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>username:</ControlLabel>
                    <FormControl
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.onFieldChange}/><br/>
                    <ControlLabel>password:</ControlLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onFieldChange}/><br/>
                    <Button bsStyle='success' type='submit'>login</Button>
                </FormGroup>

            </form>
        )}
}

export default LoginForm