import { OBTENER_TOKEN } from "./ActionTypes.js"
export function obtenerTOKEN(payload){
    return { type: OBTENER_TOKEN, payload:payload}
  }
