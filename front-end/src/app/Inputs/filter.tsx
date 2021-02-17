import React from 'react';
import { connect } from 'react-redux';
import { applyFilter, clearFilter } from '../../redux/rushing/thunk';

interface FIlterProps {
    setFilter: (filter: string) => void;
    clearFilter: () => void;
}

const FilterComponent: React.FC<FIlterProps> = props => {
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
            <input value={nameFilter} onChange={onNameFilterChange} />
            <button disabled={!nameFilter} onClick={() => props.setFilter(nameFilter)}>OK</button>
            <button onClick={clearFilter}>Clear Filter</button>
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