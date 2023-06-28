import { BOOK_EVENT, GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENT_DETAILS } from "../actions/actionTypes";
import eventData from '../actions/events.json'

const INIT_STATE = {
    eventLists : [],
    eventDetails : null
}

export default function(state = INIT_STATE, action) {
    switch(action.type) {
        case GET_EVENTS: 
            return {
                ...state,
                eventLists : []
            }
         case GET_EVENTS_SUCCESS: {
            return {
                ...state,
                eventLists : action?.payload
            }
         }   
         case GET_EVENT_DETAILS: {
            return {
                ...state,
                eventDetails : action?.payload
            }
        }
        case BOOK_EVENT: {
            let event = eventData.find((item) => item?.id)
            return {
                ...state,
            }
        }
         default:
            return state;
    }
  
}