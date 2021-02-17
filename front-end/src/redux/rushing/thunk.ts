import axios from 'axios';

import { setData, setFilter, setSort } from "./actions";
import { getApiQueryParams } from './selectors';
import { ApiNflRushingDataItem, ApiQueryParams, NflRushingDataItem, SortDirection, SortOption } from "./types";

function mapApiData(rawData: ApiNflRushingDataItem[]): NflRushingDataItem[] {
    return rawData.map(raw => ({
        name: raw.name,
        team: raw.team,
        position: raw.position,

        rushingAttempts: raw.rushing_attempts,
        rushingAttemptsPerGame: raw.rushing_attempts_per_game,
        
        totalRushingYards: raw.total_rushing_yards,
        rushingYardsPerAttempt: raw.rushing_yards_per_attempt,
        rushingYardsPerGame: raw.rushing_yards_per_game,

        totalRushingTouchdowns: raw.total_rushing_touchdowns,

        longestRush: raw.longest_rush,
        longestRushTouchdown: raw.longest_rush_touchdown,

        rushFirstDowns: raw.rush_first_downs,
        rushFirstDownPercent: raw.rush_first_down_percent,

        rush20Plus: raw.rush_20_plus,
        rush40Plus: raw.rush_40_plus,

        rushFumbles: raw.rush_fumbles,
    }));
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:80'
});

async function doFetch(params: ApiQueryParams, dispatch: Function) {
    const response = await axiosInstance.get('nfl-rushing/api', { params });
    const realData = mapApiData(response.data.data);
    dispatch(setData(realData, response.data.page_number, response.data.num_pages));
}

export const fetchData = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};

export const nextPage = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());

    params.page += 1;

    await doFetch(params, dispatch);
};

export const previousPage = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());
    params.page -= 1;

    await doFetch(params, dispatch);
};

export const applyFilter = (nameFilter: string) => async (dispatch: Function, getState: any) => {
    dispatch(setFilter(nameFilter));

    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};

export const sorting = (sortOption: SortOption, sortDirection: SortDirection) => async (dispatch: Function, getState: any) => {
    dispatch(setSort(sortOption, sortDirection));

    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};