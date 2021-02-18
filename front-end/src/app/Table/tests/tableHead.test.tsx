import React from 'react';
import '@testing-library/react';

import { shallow } from 'enzyme';
import { TableHead } from '../table';

describe('Table head', () => {
    it('renders', () => {
        const wrapper = shallow(<TableHead />);

        expect(wrapper).toMatchSnapshot();
    });
});
