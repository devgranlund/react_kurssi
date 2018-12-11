import loginService from '../services/login'

const initialState = {
    user: null
}

const userReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'LOGIN':
        store.user = action.user
        return store
    case 'SET_USER':
        return action
    case 'LOGOUT':
        return ''
    default:
        return store
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username: username,
            password: password
        })
        dispatch({
            type: 'LOGIN',
            user: user
        })
        return user
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user
    }
}

export default userReducer