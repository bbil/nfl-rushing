import React from 'react';
import '@testing-library/react';

import { shallow } from 'enzyme';

import { TableComponent, TableProps } from '../table';

describe('Table Component', () => {
    const PROPS: TableProps = {
        fetchData: jest.fn(),
        nflRushingData: []
    };

    beforeEach(() => {
        // have useEffect actually run
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders', () => {
        const wrapper = shallow(<TableComponent {...PROPS} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('calls initial on mount', () => {
        shallow(<TableComponent {...PROPS} />);

        expect(PROPS.fetchData).toHaveBeenCalled();
    });
});
