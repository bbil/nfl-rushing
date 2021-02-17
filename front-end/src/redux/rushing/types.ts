
export interface ApiNflRushingDataItem {
    name: string;
    team: string;
    position: string;

    rushing_attempts: number;
    rushing_attempts_per_game: number;
    
    total_rushing_yards: number;
    rushing_yards_per_attempt: number;
    rushing_yards_per_game: number;

    total_rushing_touchdowns: number;

    longest_rush: number;
    longest_rush_touchdown: boolean;

    rush_first_downs: number;
    rush_first_down_percent: number;

    rush_20_plus: number;
    rush_40_plus: number;

    rush_fumbles: number;
}

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
