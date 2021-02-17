import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { RushingState } from './rushing/types';

import rushing from './rushing/reducer';

export interface State {
    rushing: RushingState;
}

const reducer = combineReducers({
    rushing
})

export const store = createStore(reducer, applyMiddleware(thunk));
