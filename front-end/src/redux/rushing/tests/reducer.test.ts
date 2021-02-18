import '@testing-library/react';

import * as actions from '../actions';
import reducer from '../reducer';
import { NflRushingDataItem, RushingState, SortDirection, SortOption } from '../types';

describe('rushing reducer', () => {
    const RUSHING_DATA: NflRushingDataItem[] = [
        {
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
        }
    ];

    const DEFAULT_STATE: RushingState = {
        data: [],
        pageNumber: 1,
        numberOfPages: 1,
        sortDirection: null,
        sortOption: null,
        nameFilter: null
    };

    it('sets rushing data', () => {
        const action = actions.setData(RUSHING_DATA, 2, 3);

        const state = reducer(DEFAULT_STATE, action);

        expect(state.data).toEqual(RUSHING_DATA);
        expect(state.numberOfPages).toEqual(3);
        expect(state.pageNumber).toEqual(2);
    });


    it('sets filter', () => {
        const action = actions.setFilter('name filter');

        const state = reducer(DEFAULT_STATE, action);
        expect(state.nameFilter).toEqual('name filter');
    });

    it('removes filter, and goes back to first page', () => {
        let state: RushingState = { ...DEFAULT_STATE, nameFilter: 'name filter', pageNumber: 2 };

        state = reducer(state, actions.removeFilter());

        expect(state.nameFilter).toBeNull();
        expect(state.pageNumber).toBe(1);
    });

    it('sets sort', () => {
        const action = actions.setSort(SortOption.LONGEST_RUSH, SortDirection.ASC);

        const state = reducer(DEFAULT_STATE, action);

        expect(state.sortDirection).toEqual(SortDirection.ASC)
        expect(state.sortOption).toEqual(SortOption.LONGEST_RUSH);
    });

    it('removes sort, and goes back to first page', () => {
        let state: RushingState = {
            ...DEFAULT_STATE,
            sortDirection: SortDirection.DESC,
            sortOption: SortOption.LONGEST_RUSH,
            pageNumber: 2
        };

        state = reducer(state, actions.removeSort());

        expect(state.sortDirection).toBeNull();
        expect(state.sortOption).toBeNull();
        expect(state.pageNumber).toBe(1);
    });
});