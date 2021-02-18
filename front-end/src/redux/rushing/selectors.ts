import { BASE_URL } from "../../constants";
import { State } from "../store";
import { ApiQueryParams, NflRushingDataItem } from "./types";

export const getData = (state: State): NflRushingDataItem[] => state.rushing.data;

export const getApiQueryParams = (state: State): ApiQueryParams => {
    const params: ApiQueryParams = {
        page: state.rushing.pageNumber
    };

    if (state.rushing.sortDirection) {
        params.sort_direction = state.rushing.sortDirection;
    }

    if (state.rushing.sortOption) {
        params.sort_option = state.rushing.sortOption;
    }

    if (state.rushing.nameFilter) {
        params.name_filter = state.rushing.nameFilter;
    }

    return params;
};

export const getHasPreviousPage = (state: State) => state.rushing.pageNumber !== 1;

export const getHasNextPage = (state: State) => state.rushing.pageNumber < state.rushing.numberOfPages;

export const getCsvLink = (state: State): string => {
    const obj: any = {};

    if (state.rushing.sortDirection) {
        obj['sort_direction'] = state.rushing.sortOption;
    }

    if (state.rushing.sortOption) {
        obj['sort_option'] = state.rushing.sortOption;
    }

    if (state.rushing.nameFilter) {
        obj['name_filter'] = state.rushing.nameFilter;
    }

    if (Object.keys(obj).length === 0) {
        return `${BASE_URL}/nfl-rushing/csv`;
    }

    // @ts-ignore
    const queryString = new URLSearchParams(obj).toString();
    return `${BASE_URL}/nfl-rushing/csv?${queryString}`;
}

export const getSorting = (state: State) => {
    return {
        sortDirection: state.rushing.sortDirection,
        sortOption: state.rushing.sortOption
    }
}
