import React from 'react';
import '@testing-library/react';

import { shallow } from 'enzyme';

import { FilterProps, FilterComponent } from '../filter';

describe('Filter Component', () => {
    const PROPS: FilterProps = {
        clearFilter: jest.fn(),
        setFilter: jest.fn()
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders default; no value, and button disabled', () => {
        const wrapper = shallow(<FilterComponent {...PROPS} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('enables button after input', () => {
        const wrapper = shallow(<FilterComponent {...PROPS} />);

        wrapper.find('#filter-input').simulate('change', { target: { value: 'new value' }});

        expect(wrapper).toMatchSnapshot();
    });

    it('calls set filter on button click', () => {
        const wrapper = shallow(<FilterComponent {...PROPS} />);

        wrapper.find('#filter-input').simulate('change', { target: { value: 'new value' }});
        wrapper.find('#filter-ok').simulate('click');

        expect(PROPS.setFilter).toHaveBeenCalledTimes(1);
        expect(PROPS.setFilter).toHaveBeenCalledWith('new value');
    });

    it('calls clear filter on button click, and sets value back to empty string', () => {
        const wrapper = shallow(<FilterComponent {...PROPS} />);

        wrapper.find('#filter-input').simulate('change', { target: { value: 'new value' }});
        wrapper.find('#filter-clear').simulate('click');

        expect(PROPS.clearFilter).toHaveBeenCalledTimes(1);

        expect(wrapper).toMatchSnapshot();
    });
});

