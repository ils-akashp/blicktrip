import axios from "axios"
import { BOOK_EVENT, GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENT_DETAILS } from "./actionTypes"

export function getEventList() {
    return async function(dispatch) {
        dispatch({
            type : GET_EVENTS
        })
        try {
            const response = await axios.get('/db/events.json')
            dispatch({
                type: GET_EVENTS_SUCCESS,
                payload: response.data,
            })
        } catch (error) {
        }
    }
}

export function getEventDetails(item) {
    return async function (dispatch) {
        dispatch({
            type: GET_EVENT_DETAILS,
            payload: item,
        });
    };
}
export function bookEvent(data) {
    return async function (dispatch) {
        dispatch({
            type: BOOK_EVENT,
            payload: data,
        });
    };
}