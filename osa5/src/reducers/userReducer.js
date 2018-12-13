import loginService from '../services/login'

const initialState = {
    user: null,
    user_loading: false,
    user_error: null
}

const userReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'LOGIN_BEGIN':
        return action
    case 'LOGIN_SUCCESS':
        return action
    case 'LOGIN_FAILURE':
        return action
    case 'SET_USER':
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

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user,
        user_loading: false,
        user_error: null
    }
}

export default userReducer