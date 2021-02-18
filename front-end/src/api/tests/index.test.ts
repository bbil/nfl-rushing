import '@testing-library/react';
import { fetchRushingStats, RushingStats } from '..';
import { BASE_URL } from '../../constants';

describe('api', () => {

    const API_RESPONSE = {
        data: {
            num_pages: 2,
            page_number: 1,
            data: [
                {
                    longest_rush: 1,
                    longest_rush_touchdown: false,
                    name: 'name',
                    position: 'position',
                    rush_20_plus: 1,
                    rush_40_plus: 1,
                    rush_first_down_percent: 0,
                    rush_first_downs: 0,
                    rush_fumbles: 1,
                    rushing_attempts: 0,
                    rushing_attempts_per_game: 0,
                    rushing_yards_per_attempt: 0,
                    rushing_yards_per_game: 0,
                    team: 'team',
                    total_rushing_touchdowns:0,
                    total_rushing_yards: 0
                }
            ]
        }
    }

    const RUSHING_STATS: RushingStats = {
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
        numberOfPages: 2,
        pageNumber: 1
    }

    it('calls api, and maps the reponse', async () => {
        const mockAxios = {
            get: jest.fn(() => {
                return Promise.resolve(API_RESPONSE)
            })
        };

        // @ts-ignore -- mock axios instance
        const rushingStats: RushingStats = await fetchRushingStats({ page: 1 }, mockAxios)

        expect(mockAxios.get).toHaveBeenCalledWith('nfl-rushing/api', { params: { page: 1 }, baseURL: BASE_URL });
        expect(rushingStats).toEqual(RUSHING_STATS);
    });
});
