const initialState = {
    message: 'This is sample notification text'
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

export const showVotedNotification = (anecdote, visibilityTimeInSec) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            message: 'you voted ' + anecdote
        })
        await setTimeout(() => {
            dispatch(clearNotification())
        },  visibilityTimeInSec * 1000)
    }
}

export const showCreatedNotification = (content) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: 'you created ' + content
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        message: ''
    }
}

export default notificationReducer