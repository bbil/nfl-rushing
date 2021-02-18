
import '@testing-library/react';

import { mount } from 'enzyme';
import { TableBody, TableBodyProps } from '../table';

describe('Table body', () => {
    const PROPS: TableBodyProps = {
        data: [
            {
                longestRush: 1,
                longestRushTouchdown: false,
                name: 'name',
                position: 'position',
                rush20Plus: 1,
                rush40Plus: 1,
                rushFirstDownPercent: 0,
                rushFirstDowns: 0,
                rushFumbles: 1,
                rushingAttempts: 0,
                rushingAttemptsPerGame: 0,
                rushingYardsPerAttempt: 0,
                rushingYardsPerGame: 0,
                team: 'team',
                totalRushingTouchdowns:0,
                totalRushingYards: 0
            },
            {
                longestRush: 1,
                longestRushTouchdown: true,
                name: 'name 2',
                position: 'position',
                rush20Plus: 1,
                rush40Plus: 1,
                rushFirstDownPercent: 0,
                rushFirstDowns: 0,
                rushFumbles: 1,
                rushingAttempts: 0,
                rushingAttemptsPerGame: 0,
                rushingYardsPerAttempt: 0,
                rushingYardsPerGame: 0,
                team: 'team 2',
                totalRushingTouchdowns:0,
                totalRushingYards: 0
            },
        ]
    };

    it('renders players', () => {
        // wrap in table to silece console warning
        const wrapper = mount(
            <table>
                <TableBody {...PROPS} />
            </table>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
