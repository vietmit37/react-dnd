import {data} from "../mock/data.js";
import {getLocalStorage} from "../helpers/getLocalStorage.js";

// constant
const DND_CARD = 'TRELLO/DND_CARD';
const ADD_CARD = 'TRELLO/ADD_CARD';
const DELETE_CARD = 'TRELLO/DELETE_CARD';
const CHANGE_TODOS = 'TRELLO/CHANGE_TODOS';
// initial state

console.log(getLocalStorage())
export const initialState = {
    todos: getLocalStorage()
}

// action creator
export const dndCard = () => {
    return {
        type: DND_CARD,
    }
}
export const changeTodos = (payload) => {
    return {
        type: CHANGE_TODOS,
        payload
    }
}
export const addCard = (payload) => {
    return {
        type: ADD_CARD,
        payload
    }
}

export const deleteCard = (payload) => {
    return {
        type: DELETE_CARD,
        payload
    }
}
// reducer
export function reducer(state = initialState, { type, payload }) {
    switch(type) {
        case DND_CARD: {
            return {
                ...state,
            }
        }
        case CHANGE_TODOS: {
            return {
                ...state,
            }
        }
        // case ADD_CARD: {
        //     return {
        //         ...state
        //     }
        // }
        // case DELETE_CARD: {
        //     return {
        //         ...state
        //     }
        // }
        default:
            return state
    }
}
