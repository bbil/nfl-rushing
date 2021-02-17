import React from 'react';
import { connect } from 'react-redux';
import { applyFilter } from '../../redux/rushing/thunk';

interface FIlterProps {
    setFilter: (filter: string) => void;
}

const FilterComponent: React.FC<FIlterProps> = props => {
    const [nameFilter, setNameFilter] = React.useState('');
    const onNameFilterChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameFilter(event.target.value);
    }, [setNameFilter]);

    return (
        <div>
            <h3>Player Name Filter:</h3>
            <input value={nameFilter} onChange={onNameFilterChange} />
            <button onClick={() => props.setFilter(nameFilter)}>OK</button>
        </div>
    );
};

function mapDispatchToProps(dispatch: Function) {
    return {
        setFilter: (filter: string) => dispatch(applyFilter(filter))
    }
}

export const Filter = connect(undefined, mapDispatchToProps)(FilterComponent);