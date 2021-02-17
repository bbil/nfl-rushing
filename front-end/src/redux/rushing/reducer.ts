import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { RushingState } from './types';

import * as actions from './actions';

type Actions = ActionType<typeof actions>;

const DEFAULT_STATE: RushingState = {
    data: [],
    pageNumber: 1,
    numberOfPages: 1,
    sortDirection: null,
    sortOption: null,
    nameFilter: null
};

const reducer: Reducer<RushingState, Actions> = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case getType(actions.setData):
            return {
                ...state,
                data: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                pageNumber: action.payload.pageNumber
            }
        case getType(actions.setFilter):
            return {
                ...state,
                nameFilter: action.payload.filter,
                pageNumber: 1
            };
        case getType(actions.removeFilter):
            return {
                ...state,
                nameFilter: null,
                pageNumber: 1
            }
        case getType(actions.setSort):
            return {
                ...state,
                sortDirection: action.payload.sortDirection,
                sortOption: action.payload.sortOption,
                pageNumber: 1
            };
        case getType(actions.removeSort):
            return {
                ...state,
                sortDirection: null,
                sortOption: null,
                pageNumber: 1
            }
        
        default:
            return state;
    }

};

export default reducer;