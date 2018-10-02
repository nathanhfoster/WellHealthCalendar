import C from '../constants.js'
import { combineReducers } from 'redux'

export const Window = (state = {}, action) =>
(action.type === C.SET_WINDOW) ? action.payload : state

export const CalendarEvents = (state = [], action) =>
(action.type === C.SET_CALENDAR_EVENTS) ? action.payload : state

export const appReducer = combineReducers({
    Window,
    CalendarEvents
})
