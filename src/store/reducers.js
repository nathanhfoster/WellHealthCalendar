import C from '../constants.js'
import { combineReducers } from 'redux'

export const LoginToken = (state = {}, action) =>
(action.type === C.SET_LOGIN_TOKEN) ? action.payload : (action.type === C.SET_LOGOUT) ? {} : state

export const appReducer = combineReducers({

})
