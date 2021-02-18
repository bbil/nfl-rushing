import '@testing-library/react';

import * as actions from '../actions';
import * as api from '../../../api';
import { doFetch } from '../thunkHelper';

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
        await doFetch({ page: 1 }, dispatch);

        expect(api.fetchRushingStats).toHaveBeenCalledWith({ page: 1 });
        expect(dispatch).toHaveBeenCalledWith(actions.setData(
            RUSHING_STATS.data,
            RUSHING_STATS.pageNumber,
            RUSHING_STATS.numberOfPages 
        ));
    });
});