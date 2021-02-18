import { fetchRushingStats } from "../../api";
import { setData } from "./actions";
import { ApiQueryParams } from "./types";

/**
 * Originally this doFetch helper was defined in thunks.ts; ran into issues with jest spying, which did not
 * like spying on something part of the same module under test. Had a solution that worked for the tests but broke
 * at run-time, so split into it's own file
 */

/**
 * Helper that calls to api, and dispatches action to set data in redux
 * 
 * @param params 
 * @param dispatch 
 */
export async function doFetch(params: ApiQueryParams, dispatch: Function) {
    const rushingStats = await fetchRushingStats(params);
    dispatch(setData(rushingStats.data, rushingStats.pageNumber, rushingStats.numberOfPages));
}