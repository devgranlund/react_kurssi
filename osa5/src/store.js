import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import logger from 'redux-logger'

const reducer = combineReducers({
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk), applyMiddleware(logger))
//const store = createStore(reducer, applyMiddleware(thunk))
export default store