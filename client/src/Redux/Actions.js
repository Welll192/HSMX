import { OBTENER_TOKEN, GUARDAR_ID} from "./ActionTypes.js"
export function obtenerTOKEN(payload){
    return { type: OBTENER_TOKEN, payload:payload}
  }

export function guardarID(payload) {
  return {type: GUARDAR_ID, payload:payload}
}
