import React from 'react';
import { connect } from "react-redux";
import { getSorting } from "../../redux/rushing/selectors";
import { applySort, clearSort } from "../../redux/rushing/thunk";
import { SortDirection, SortOption } from "../../redux/rushing/types";
import { State } from "../../redux/store";

interface SortingDispatchProps {
    applySort: (sortOption: SortOption, sortDirection: SortDirection) => void;
    clearSort: () => void;
}

interface SortingStateProps {
    sortOption: SortOption | null;
    sortDirection: SortDirection | null;
}

export type SortingProps = SortingDispatchProps & SortingStateProps;

export const SortingComponent: React.FC<SortingProps> = props => {
    const [sortOption, setSortOption] = React.useState<SortOption | null>(null)

    const sortOptionOnChange = (event: any) => {
        setSortOption(event.target.value);
    }

    const [sortDirection, setSortDirection] = React.useState<SortDirection | null>(null);

    const sortDirectionOnChange = (event: any) => {
        setSortDirection(event.target.value);
    };

    const clearSort = () => {
        props.clearSort();

        setSortOption(null);
        setSortDirection(null);
    }

    const enableButtons = sortOption !== null && sortDirection !== null;

    return (
        <div>
            <div id='sort-options' onChange={sortOptionOnChange}>
                <input type="radio" value={SortOption.LONGEST_RUSH} name="sortOption" checked={sortOption === SortOption.LONGEST_RUSH} /> Longest Rush
                <input type="radio" value={SortOption.TOTAL_RUSHING_TOUCHDOWNS} name="sortOption" checked={sortOption === SortOption.TOTAL_RUSHING_TOUCHDOWNS} /> Total Rushing Touchdowns
                <input type="radio" value={SortOption.TOTAL_RUSHING_YARDS} name="sortOption" checked={sortOption === SortOption.TOTAL_RUSHING_YARDS}/> Total Rushing Yards
            </div>

            <div id='sort-directions' onChange={sortDirectionOnChange}>
                <input type="radio" value={SortDirection.DESC} name="sortDirection" checked={sortDirection === SortDirection.DESC} /> Desc
                <input type="radio" value={SortDirection.ASC} name="sortDirection" checked={sortDirection === SortDirection.ASC} /> Asc
            </div>

            {/* Ignore null; the enable buttons boolean guarantees it's good */}
            <button id='sort-apply' disabled={!enableButtons} onClick={() => props.applySort(sortOption!, sortDirection!)}>Apply Sort</button>
            <button id='sort-clear' onClick={clearSort}>Clear Sort</button>
        </div>
    )
};

function mapStateToProps(state: State): SortingStateProps {
    const sorting = getSorting(state);
    return {
        sortDirection: sorting.sortDirection,
        sortOption: sorting.sortOption
    }
}

function mapDispatchToProps(dispatch: Function): SortingDispatchProps {
    return {
        applySort: (sortOption: SortOption, sortDirection: SortDirection) => dispatch(applySort(sortOption, sortDirection)),
        clearSort: () => dispatch(clearSort())
    }
}

export const Sorting = connect(mapStateToProps, mapDispatchToProps)(SortingComponent);