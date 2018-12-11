const initialState = {
    message: '',
    cssClass: ''
}

const notificationReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'SHOW_NOTIFICATION':
        return action
    case 'CLEAR_NOTIFICATION':
        return ''
    default:
        return store
    }
}

export const showNotification = (message, cssClass, reload) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            message: message,
            cssClass: cssClass
        })
        await setTimeout(() => {
            dispatch(clearNotification())
            if (reload) {
                window.location.reload()
            }
        },  5000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        message: '',
        cssClass: ''
    }
}

export default notificationReducer