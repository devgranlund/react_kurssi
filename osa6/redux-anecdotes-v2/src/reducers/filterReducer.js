const initialState = {
    filter: ''
}

const filterReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'CHANGE_FILTER':
        return action
    case 'CLEAR_FILTER':
        return ''
    default:
        return store
    }
}

export const changeFilter = (newFilter) => {
    return {
        type: 'CHANGE_FILTER',
        filter: newFilter
    }
}

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export default filterReducer