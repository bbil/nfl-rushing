import '@testing-library/react';
import { State } from '../../store';

import * as selectors from '../selectors';
import { RushingState, SortDirection, SortOption } from '../types';

describe('rushing selectors', () => {
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

    describe('getApiQueryParams', () => {
        it('returns only page when all others are null', () => {
            expect(selectors.getApiQueryParams(DEFAULT_STATE)).toEqual({
                page: 1
            });
        });

        it('sets all params', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    sortDirection: SortDirection.ASC,
                    sortOption: SortOption.LONGEST_RUSH,
                    nameFilter: 'name'
                }
            }
            expect(selectors.getApiQueryParams(state)).toEqual({
                page: 1,
                sort_direction: SortDirection.ASC,
                sort_option: SortOption.LONGEST_RUSH,
                name_filter: 'name'
            });
        });
    });

    describe('getHasPreviousPage', () => {
        it('is false if on page 1', () => {
            expect(selectors.getHasPreviousPage(DEFAULT_STATE)).toBe(false);
        });

        it('is true if on any other page', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    pageNumber: 2
                }
            };
            expect(selectors.getHasPreviousPage(state)).toBe(true);
        });
    });

    describe('getHasNextPage', () => {
        it('is false when the last page', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    pageNumber: 3,
                    numberOfPages: 3
                }
            };

            expect(selectors.getHasNextPage(state)).toBe(false);
        });

        it('is true when more pages left', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    pageNumber: 3,
                    numberOfPages: 4
                }
            };

            expect(selectors.getHasNextPage(state)).toBe(true);
        });
    });

    describe('getSorting', () => {
        it('returns sorting data', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    sortOption: SortOption.LONGEST_RUSH,
                    sortDirection: SortDirection.DESC
                }
            };

            expect(selectors.getSorting(state)).toEqual({
                sortDirection: SortDirection.DESC,
                sortOption: SortOption.LONGEST_RUSH
            });
        });
    });

    describe('getCsvLink', () => {
        it('generates a link without params applied', () => {
            expect(selectors.getCsvLink(DEFAULT_STATE)).toEqual('http://localhost:80/nfl-rushing/csv');
        });

        it('generates a link with all query params', () => {
            const state: State = {
                ...DEFAULT_STATE,
                rushing: {
                    ...DEFAULT_RUSHING_STATE,
                    nameFilter: 'name',
                    sortDirection: SortDirection.ASC,
                    sortOption: SortOption.TOTAL_RUSHING_TOUCHDOWNS 
                }
            };

            expect(selectors.getCsvLink(state)).toEqual(
                'http://localhost:80/nfl-rushing/csv?sort_direction=total_rushing_touchdowns&sort_option=total_rushing_touchdowns&name_filter=name'
            );
        });
    });
});
