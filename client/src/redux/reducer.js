import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOG, GET_TEMPERAMENTS, ERROR, POST_DOG } from "./types";

const inicialState = {
    dogs: [],
    dog: [],
    origin:'',
    temperaments: [],
    errors: null,
}

const rootReducer = (state = inicialState, action)=>{
    switch(action.type){
        case GET_DOGS: 
            return {
                ...state, 
                dogs: action.payload,
                errors: null
            };
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogs: action.payload,
                errors: null
            }
        case GET_DOG:
            return {
                ...state,
                dog: action.payload,
                errors: null
            }
        case POST_DOG:
            return{
                ...state,
                dog: action.payload,
                errors: null
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case ERROR:
            return {
                ...state,
                errors: action.payload
            }
        default: 
            return {...state};
    }
}

export default rootReducer;