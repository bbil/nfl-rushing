import React from 'react';
import { connect } from 'react-redux';

import { getData } from '../../redux/rushing/selectors';
import { initialFetch } from '../../redux/rushing/thunk';
import { NflRushingDataItem } from '../../redux/rushing/types';
import { State } from '../../redux/store';
import { Pagination } from './pagination';

interface TableDispatchProps {
    fetchData: () => void;
}

interface TableStateProps {
    nflRushingData: NflRushingDataItem[];
}

export type TableProps = TableDispatchProps & TableStateProps;

export const TableComponent: React.FC<TableProps> = props => {
    // on mount; load first-time data
    React.useEffect(() => {
        props.fetchData();
    }, []);

    return (
        <>
            <table className="table table-bordered table-striped">
                <TableHead />
                <TableBody data={props.nflRushingData} />
            </table>
            <Pagination />
        </>
    );
};

function mapDispatchToProps(dispatch: Function): TableDispatchProps {
    return {
        fetchData: () => dispatch(initialFetch())
    }
}

function mapStateToProps(state: State): TableStateProps {
    return {
        nflRushingData: getData(state)
    }
}

export const Table = connect(mapStateToProps, mapDispatchToProps)(TableComponent);

export const TableHead: React.FC = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Team</th>
      <th>Position</th>
      <th>Rushing Attempts</th>
      <th>Rushing Attempts / Game</th>
      <th>Total Rushing Yards</th>
      <th>Rushing Yards / Game</th>
      <th>Rushing Yards / Attempt</th>
      <th>Rushing Touchdowns</th>
      <th>Longest Rush</th>
      <th>Longest Rush was a touchdown</th>
      <th>Rush First Downs</th>
      <th>Rush First Downs %</th>
      <th>Rush 20+ Yards</th>
      <th>Rush 40+ Yards</th>
      <th>Rush Fumbles</th>
    </tr>
  </thead>
);

export type TableBodyProps = { data: NflRushingDataItem[] };
export const TableBody: React.FC<TableBodyProps> = ({ data }) => (
  <tbody>
    {data.map(player => {
        return (
            <TableRow key={player.name} player={player} />
        )
    })}
  </tbody>
);

type TableRowProps = { player: NflRushingDataItem };
const TableRow: React.FC<TableRowProps> = ({ player }) => (
    <tr>
        <td>{player.name}</td>
        <td>{player.team}</td>
        <td>{player.position }</td>
        <td>{player.rushingAttempts}</td>
        <td>{player.rushingAttemptsPerGame }</td>
        <td>{player.totalRushingYards}</td>
        <td>{player.rushingYardsPerAttempt }</td>
        <td>{player.rushingYardsPerGame }</td>
        <td>{player.totalRushingTouchdowns}</td>
        <td>{player.longestRush}</td>
        <td>{player.longestRushTouchdown ? <>&#10003;</> : <>&#10007;</>}</td>
        <td>{player.rushFirstDowns}</td>
        <td>{player.rushFirstDownPercent}</td>
        <td>{player.rush20Plus}</td>
        <td>{player.rush40Plus}</td>
        <td>{player.rushFumbles}</td>
    </tr>
);
