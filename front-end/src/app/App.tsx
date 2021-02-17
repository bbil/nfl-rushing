import React from 'react';

import './App.css';
import { Inputs } from './Inputs/inputs';
import { Table } from './Table/table';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Nfl Rushing Statistics</h1>
      <Inputs />
      <Table />
    </div>
  );
}

export default App;
