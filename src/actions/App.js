import C from '../constants'

export const setWindow = (Window) => ({
    type: C.SET_WINDOW,
    payload: Window
 })