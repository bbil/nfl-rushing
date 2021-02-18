import React from 'react';
import { connect } from 'react-redux';
import { getCsvLink } from '../../redux/rushing/selectors';
import { State } from '../../redux/store';
import { Filter } from './filter';
import { Sorting } from './sorting';

export interface InputsProps {
    csvLink: string;
}

export const InputsComponent: React.FC<InputsProps> = props => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Filter />
                </div>
                <div className="col">
                    <Sorting />
                </div>
                <div className="col">
                    <a href={props.csvLink}>Download CSV</a>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state: State): InputsProps {
    return {
        csvLink: getCsvLink(state)
    }
}

export const Inputs = connect(mapStateToProps)(InputsComponent);