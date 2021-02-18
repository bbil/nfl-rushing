
import { fetchRushingStats } from "../../api";
import { removeFilter, removeSort, setData, setFilter, setSort } from "./actions";
import { getApiQueryParams } from './selectors';
import { ApiQueryParams, SortDirection, SortOption } from "./types";

/**
 * Helper that calls to api, and dispatches action to set data in redux
 * @param params 
 * @param dispatch 
 */
export async function doFetch(params: ApiQueryParams, dispatch: Function) {
    const rushingStats = await fetchRushingStats(params);
    dispatch(setData(rushingStats.data, rushingStats.pageNumber, rushingStats.numberOfPages));
}

export const initialFetch = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());

    await exports.doFetch(params, dispatch);
};

export const nextPage = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());

    params.page += 1;

    await exports.doFetch(params, dispatch);
};

export const previousPage = () => async (dispatch: Function, getState: any) => {
    const params = getApiQueryParams(getState());
    params.page -= 1;

    await exports.doFetch(params, dispatch);
};

export const applyFilter = (nameFilter: string) => async (dispatch: Function, getState: any) => {
    dispatch(setFilter(nameFilter));

    const params = getApiQueryParams(getState());
    await exports.doFetch(params, dispatch);
};

export const clearFilter = () => async (dispatch: Function, getState: any) => {
    dispatch(removeFilter());

    const params = getApiQueryParams(getState());
    await exports.doFetch(params, dispatch);
};

export const applySort = (sortOption: SortOption, sortDirection: SortDirection) => async (dispatch: Function, getState: any) => {
    dispatch(setSort(sortOption, sortDirection));

    const params = getApiQueryParams(getState());
    await exports.doFetch(params, dispatch);
};

export const clearSort = () => async (dispatch: Function, getState: any) => {
    dispatch(removeSort());

    const params = getApiQueryParams(getState());
    await exports.doFetch(params, dispatch);
};