import loginService from '../services/login'
import userService from '../services/users'

const initialState = {
    user: null,
    user_loading: false,
    user_error: null,
    users: []
}

const userReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'LOGIN_BEGIN':
        action.user = store.user
        action.users = store.users
        return action
    case 'LOGIN_SUCCESS':
        action.users = store.users
        return action
    case 'LOGIN_FAILURE':
        action.users = store.users
        return action
    case 'SET_USER':
        action.users = store.users
        return action
    case 'INIT_USERS_SUCCESS':
        action.user = store.user
        return action
    default:
        return store
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOGIN_BEGIN',
                user_loading: true,
                user: null,
                user_error: null
            })
        await loginService.login({
            username: username,
            password: password
        })
            .then(user => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    user: user,
                    user_loading: false,
                    user_error: null
                })
            }).catch( error => {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    user: null,
                    user_error: error,
                    user_loading: false
                })
            })
    }
}

export const initUsers = () => {
    return async (dispatch) => {
        dispatch(
            { type: 'LOGIN_BEGIN',
                user_loading: true,
                user_error: null
            })
        await userService.getAll()
            .then(users => {
                console.log('initUsers', users)
                dispatch({
                    type: 'INIT_USERS_SUCCESS',
                    users: users,
                    user_loading: false,
                    user_error: null
                })
            }).catch( error => {
                console.log('initUsers', error)
                dispatch({
                    type: 'LOGIN_FAILURE',
                    user: null,
                    user_error: error,
                    user_loading: false
                })
            })
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user,
        user_loading: false,
        user_error: null
    }
}

export default userReducer