import {OBTENER_TOKEN, GUARDAR_ID} from './ActionTypes.js';

const initialState = {
    token: "",
    id:"",
}
export function rootReducer(state = initialState, action) {
    switch(action.type) {
        case OBTENER_TOKEN:
        return {
            ...state,
            token: action.payload,
        }
        case GUARDAR_ID:
            return {
                ...state,
                id:action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}
