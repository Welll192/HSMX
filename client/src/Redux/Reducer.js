import {OBTENER_TOKEN} from './ActionTypes.js';

const initialState = {
    token: "",
}
export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case OBTENER_TOKEN:
        return {
            ...state,
            token: action.payload,
        }
        
        default:
            return {
                ...state,
            }
    }
}
