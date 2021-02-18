import React from 'react';
import { connect } from 'react-redux';
import { applyFilter, clearFilter } from '../../redux/rushing/thunk';

export interface FilterProps {
    setFilter: (filter: string) => void;
    clearFilter: () => void;
}

export const FilterComponent: React.FC<FilterProps> = props => {
    const [nameFilter, setNameFilter] = React.useState<string>('');
    const onNameFilterChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameFilter(event.target.value);
    }, [setNameFilter]);

    const clearFilter = () => {
        props.clearFilter();
        setNameFilter('');
    };

    return (
        <div>
            <h3>Player Name Filter:</h3>
            <input id='filter-input' value={nameFilter} onChange={onNameFilterChange} />
            <button id='filter-ok' disabled={!nameFilter} onClick={() => props.setFilter(nameFilter)}>OK</button>
            <button id='filter-clear' onClick={clearFilter}>Clear Filter</button>
        </div>
    );
};

function mapDispatchToProps(dispatch: Function) {
    return {
        setFilter: (filter: string) => dispatch(applyFilter(filter)),
        clearFilter: () => dispatch(clearFilter())
    }
}

export const Filter = connect(undefined, mapDispatchToProps)(FilterComponent);