import '@testing-library/react';
import { State } from '../../store';

import * as api from '../../../api';
import * as actions from '../actions';
import * as thunks from '../thunk';
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
            jest.spyOn(thunks, 'doFetch').mockImplementation(() => Promise.resolve());
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        test('initialFetch', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.initialFetch()(dispatch, getState);

            expect(thunks.doFetch).toHaveBeenCalledWith({ page: 1 }, dispatch);
        });

        test('nextPage increments page', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.nextPage()(dispatch, getState);

            expect(thunks.doFetch).toHaveBeenCalledWith({ page: 2 }, dispatch);
        });

        test('previous page decrements page', () => {
            const dispatch = jest.fn();
            const getState = () => DEFAULT_STATE;

            thunks.previousPage()(dispatch, getState);

            expect(thunks.doFetch).toHaveBeenCalledWith({ page: 0 }, dispatch);
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
            expect(thunks.doFetch).toHaveBeenCalledWith(
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
            expect(thunks.doFetch).toHaveBeenCalledWith(
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
            expect(thunks.doFetch).toHaveBeenCalledWith(
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
            expect(thunks.doFetch).toHaveBeenCalledWith(
                { page: 1 }, dispatch
            );
        });
    });

    describe('doFetch', () => {
        const RUSHING_STATS: api.RushingStats = {
            data: [{
                longestRush: 1,
                longestRushTouchdown: false,
                name: 'name',
                position: 'position',
                rush20Plus: 1,
                rush40Plus: 1,
                rushFirstDownPercent: 0,
                rushFirstDowns: 0,
                rushFumbles: 1,
                rushingAttempts: 0,
                rushingAttemptsPerGame: 0,
                rushingYardsPerAttempt: 0,
                rushingYardsPerGame: 0,
                team: 'team',
                totalRushingTouchdowns:0,
                totalRushingYards: 0
            }],
            numberOfPages: 1,
            pageNumber: 1
        }
        
        beforeEach(() => {
            jest.spyOn(api, 'fetchRushingStats').mockImplementation(() => Promise.resolve(RUSHING_STATS));
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.resetAllMocks();
        });

        it('dispatches setData after calling api', async () => {
            const dispatch = jest.fn();
            await thunks.doFetch({ page: 1 }, dispatch);

            expect(api.fetchRushingStats).toHaveBeenCalledWith({ page: 1 });
            expect(dispatch).toHaveBeenCalledWith(actions.setData(
                RUSHING_STATS.data,
                RUSHING_STATS.pageNumber,
                RUSHING_STATS.numberOfPages 
            ));
        });
    });
});