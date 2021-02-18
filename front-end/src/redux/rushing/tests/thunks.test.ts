import '@testing-library/react';
import { State } from '../../store';

import * as actions from '../actions';
import * as thunks from '../thunk';
import * as thunkHelpers from '../thunkHelper';
import { RushingState, SortDirection, SortOption } from '../types';

describe('rushing thunks', () => {
    const DEFAULT_RUSHING_STATE: RushingState = {
        data: [],
        pageNumber: 1,
        numberOfPages: 1,
        sortDirection: null,
        sortOption: null,
        nameFilter: null
    }
    const DEFAULT_STATE: State = {
        rushing: DEFAULT_RUSHING_STATE
    };

    describe('mocking out api call', () => {
        beforeEach(() => {
            jest.spyOn(thunkHelpers, 'doFetch').mockImplementation(() => Promise.resolve());
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        test('initialFetch', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.initialFetch()(dispatch, getState);

            expect(thunkHelpers.doFetch).toHaveBeenCalledWith({ page: 1 }, dispatch);
        });

        test('nextPage increments page', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.nextPage()(dispatch, getState);

            expect(thunkHelpers.doFetch).toHaveBeenCalledWith({ page: 2 }, dispatch);
        });

        test('previous page decrements page', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.previousPage()(dispatch, getState);

            expect(thunkHelpers.doFetch).toHaveBeenCalledWith({ page: 0 }, dispatch);
        });
        
        test('applyFilter dispatches setFilter before fetch', () => {
            const dispatch = jest.fn();
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    nameFilter: 'name'
                }
            };

            const getState = () => state;

            thunks.applyFilter('name')(dispatch, getState);

            expect(dispatch).toHaveBeenCalledWith(actions.setFilter('name'))
            expect(thunkHelpers.doFetch).toHaveBeenCalledWith(
                { page: 1, name_filter: 'name' }, dispatch
            );
        });

        test('clearFilter dispatcehs removeFilter before fetch', () => {
            const dispatch = jest.fn();
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE
                }
            };

            const getState = () => state;

            thunks.clearFilter()(dispatch, getState);

            expect(dispatch).toHaveBeenCalledWith(actions.removeFilter())
            expect(thunkHelpers.doFetch).toHaveBeenCalledWith(
                { page: 1 }, dispatch
            );
        });

        test('applySort dispatches setSort before fetch', () => {
            const dispatch = jest.fn();
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    sortOption: SortOption.LONGEST_RUSH,
                    sortDirection: SortDirection.ASC
                }
            };

            const getState = () => state;

            thunks.applySort(SortOption.LONGEST_RUSH, SortDirection.ASC)(dispatch, getState);

            expect(dispatch).toHaveBeenCalledWith(actions.setSort(SortOption.LONGEST_RUSH, SortDirection.ASC));
            expect(thunkHelpers.doFetch).toHaveBeenCalledWith(
                { page: 1, sort_option: SortOption.LONGEST_RUSH, sort_direction: SortDirection.ASC }, dispatch
            );
        });

        test('clearSort dispatches removeSort before fetch', () => {
            const dispatch = jest.fn();
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE
                }
            };

            const getState = () => state;

            thunks.clearSort()(dispatch, getState);

            expect(dispatch).toHaveBeenCalledWith(actions.removeSort());
            expect(thunkHelpers.doFetch).toHaveBeenCalledWith(
                { page: 1 }, dispatch
            );
        });
    });
});