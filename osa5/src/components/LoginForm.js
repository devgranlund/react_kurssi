import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, username, password, onFieldChange }) => {
    return(
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <ControlLabel>username:</ControlLabel>
                <FormControl
                    type="text"
                    name="username"
                    value={username}
                    onChange={onFieldChange}/><br/>
                <ControlLabel>password:</ControlLabel>
                <FormControl
                    type="password"
                    name="password"
                    value={password}
                    onChange={onFieldChange}/><br/>
                <Button bsStyle='success' type='submit'>login</Button>
            </FormGroup>

        </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.required,
    username: PropTypes.string.required,
    password: PropTypes.string.required,
    onFieldChange: PropTypes.func.required
}

export default LoginForm