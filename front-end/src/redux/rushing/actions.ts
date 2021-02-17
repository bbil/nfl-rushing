import { createAction } from 'typesafe-actions';
import { NflRushingDataItem, SortDirection, SortOption } from './types';

export const setData = createAction('rushing/SET_DATA', action => 
    (data: NflRushingDataItem[], pageNumber: number, numberOfPages: number) => action({ data, pageNumber, numberOfPages })
);

export const setSort = createAction('rushing/SET_SORT', action =>
    (sortOption: SortOption, sortDirection: SortDirection) => action({ sortOption, sortDirection })
);

export const setFilter = createAction('rushing/SET_FILTER', action =>
    (filter: string) => action({ filter })
);
