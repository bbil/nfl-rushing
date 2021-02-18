import { removeFilter, removeSort, setFilter, setSort } from "./actions";
import { getApiQueryParams } from './selectors';
import { doFetch } from "./thunkHelper";
import { SortDirection, SortOption } from "./types";

export const initialFetch = () => async (dispatch: Function, getState: any) => {
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

export const clearFilter = () => async (dispatch: Function, getState: any) => {
    dispatch(removeFilter());

    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};

export const applySort = (sortOption: SortOption, sortDirection: SortDirection) => async (dispatch: Function, getState: any) => {
    dispatch(setSort(sortOption, sortDirection));

    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};

export const clearSort = () => async (dispatch: Function, getState: any) => {
    dispatch(removeSort());

    const params = getApiQueryParams(getState());
    await doFetch(params, dispatch);
};