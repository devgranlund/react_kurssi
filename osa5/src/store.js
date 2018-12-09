import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import logger from 'redux-logger'

const reducer = combineReducers({
    notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk), applyMiddleware(logger))
export default store