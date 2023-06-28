import { combineReducers } from 'redux';
import events from './events';

const appReducer = combineReducers({
  events
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export default rootReducer;