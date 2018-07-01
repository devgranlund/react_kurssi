import React from 'react'

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

export default LoginForm