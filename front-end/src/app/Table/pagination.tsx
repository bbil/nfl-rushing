import React from 'react';
import { connect } from 'react-redux';
import { getHasNextPage, getHasPreviousPage } from '../../redux/rushing/selectors';
import { nextPage, previousPage } from '../../redux/rushing/thunk';
import { State } from '../../redux/store';

interface PaginationStateProps {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

interface PaginationDispatchProps {
    previousPage: () => void;
    nextPage: () => void;
}

export type PaginationProps = PaginationStateProps & PaginationDispatchProps;

export const PaginationComponent: React.FC<PaginationProps> = props => {
    if (!props.hasNextPage && !props.hasPreviousPage) {
        return null;
    }

    return (
        <div className="pagination">
            <button disabled={!props.hasPreviousPage} onClick={props.previousPage}>Previous</button>
            <button disabled={!props.hasNextPage} onClick={props.nextPage}>Next</button>
        </div>
    );
};

function mapStateToProps(state: State): PaginationStateProps {
    return {
        hasNextPage: getHasNextPage(state),
        hasPreviousPage: getHasPreviousPage(state)
    }
}

function mapDispatchToProps(dispatch: Function): PaginationDispatchProps {
    return {
        nextPage: () => dispatch(nextPage()),
        previousPage: () => dispatch(previousPage())
    }
}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
