import C from '../constants'

export const setWindow = (Window) => ({
    type: C.SET_WINDOW,
    payload: Window
 })

 export const setCalendarEvents = (Events) => ({
    type: C.SET_CALENDAR_EVENTS,
    payload: Events
 })