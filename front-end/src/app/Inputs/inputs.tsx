import React from 'react';
import { connect } from 'react-redux';
import { getCsvLink } from '../../redux/rushing/selectors';
import { State } from '../../redux/store';
import { Filter } from './filter';

interface InputsProps {
    csvLink: string;
}

const InputsComponent: React.FC<InputsProps> = props => {
    return (
        <div className="container-fluid">
            <Filter />
            <a href={props.csvLink}>Download CSV</a>
        </div>
    );
};

function mapStateToProps(state: State): InputsProps {
    return {
        csvLink: getCsvLink(state)
    }
}

export const Inputs = connect(mapStateToProps)(InputsComponent);