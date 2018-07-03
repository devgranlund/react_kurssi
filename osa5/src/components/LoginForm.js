import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password, onFieldChange}) => {
    return(
        <form onSubmit={handleSubmit}>
            username:
            <input
                type="text"
                name="username"
                value={username}
                onChange={onFieldChange}/><br/>
            password:
            <input
                type="password"
                name="password"
                value={password}
                onChange={onFieldChange}/><br/>
            <button>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.string.required, 
    username: PropTypes.string.required, 
    password: PropTypes.string.required, 
    onFieldChange: PropTypes.string.required
}

export default LoginForm