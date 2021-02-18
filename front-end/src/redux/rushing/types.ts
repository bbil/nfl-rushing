
export interface NflRushingDataItem {
    name: string;
    team: string;
    position: string;

    rushingAttempts: number;
    rushingAttemptsPerGame: number;
    
    totalRushingYards: number;
    rushingYardsPerAttempt: number;
    rushingYardsPerGame: number;

    totalRushingTouchdowns: number;

    longestRush: number;
    longestRushTouchdown: boolean;

    rushFirstDowns: number;
    rushFirstDownPercent: number;

    rush20Plus: number;
    rush40Plus: number;

    rushFumbles: number;
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export enum SortOption {
    TOTAL_RUSHING_YARDS = 'total_rushing_yards',
    LONGEST_RUSH = 'longest_rush',
    TOTAL_RUSHING_TOUCHDOWNS = 'total_rushing_touchdowns'
}

export interface ApiQueryParams {
    page: number;
    sort_direction?: SortDirection;
    sort_option?: SortOption;
    name_filter?: string;
}

export interface RushingState {
    data: NflRushingDataItem[];
    pageNumber: number;
    numberOfPages: number;

    sortDirection: SortDirection | null;
    sortOption: SortOption | null;
    nameFilter: string | null;
}
