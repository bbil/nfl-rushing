import axios from 'axios';
import { BASE_URL } from '../constants';

import { ApiQueryParams, NflRushingDataItem } from "../redux/rushing/types";

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

export interface RushingStats {
    data: NflRushingDataItem[],
    pageNumber: number;
    numberOfPages: number;
}

export async function fetchRushingStats(params: ApiQueryParams, axiosInstance = axios): Promise<RushingStats> {
    const response = await axiosInstance.get('nfl-rushing/api', { params, baseURL: BASE_URL });
    const realData = mapApiData(response.data.data);

    return {
        data: realData,
        numberOfPages: response.data.num_pages,
        pageNumber: response.data.page_number
    }
}
