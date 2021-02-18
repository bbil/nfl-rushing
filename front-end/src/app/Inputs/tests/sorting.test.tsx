import '@testing-library/react';

import { shallow } from 'enzyme';
import { SortDirection, SortOption } from '../../../redux/rushing/types';

import { SortingComponent, SortingProps } from '../sorting';

describe('Sorting component', () => {
    const PROPS: SortingProps = {
        applySort: jest.fn(),
        clearSort: jest.fn(),
        sortDirection: null,
        sortOption: null
    };

    it('renders default, with nothing checked', () => {
        const wrapper = shallow(<SortingComponent {...PROPS} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with one group checked, button disabled', () => {
        const wrapper = shallow(<SortingComponent {...PROPS} />);

        wrapper.find('#sort-options').simulate('change', { target: { value: SortOption.LONGEST_RUSH }});

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with both grouops checked, button becomes enabled', () => {
        const wrapper = shallow(<SortingComponent {...PROPS} />);

        wrapper.find('#sort-options').simulate('change', { target: { value: SortOption.LONGEST_RUSH }});
        wrapper.find('#sort-directions').simulate('change', { target: { value: SortDirection.ASC }});

        expect(wrapper).toMatchSnapshot();
    });

    it('calls apply sort when button is clicked', () => {
        const wrapper = shallow(<SortingComponent {...PROPS} />);

        wrapper.find('#sort-options').simulate('change', { target: { value: SortOption.LONGEST_RUSH }});
        wrapper.find('#sort-directions').simulate('change', { target: { value: SortDirection.ASC }});

        wrapper.find('#sort-apply').simulate('click');

        expect(PROPS.applySort).toHaveBeenCalledWith(SortOption.LONGEST_RUSH, SortDirection.ASC);
    });

    it('calls clear sort when clear button is clicked, radio buttons no longer checked', () => {
        const wrapper = shallow(<SortingComponent {...PROPS} />);

        wrapper.find('#sort-options').simulate('change', { target: { value: SortOption.LONGEST_RUSH }});
        wrapper.find('#sort-directions').simulate('change', { target: { value: SortDirection.ASC }});

        // double check that radio buttons are checked -- this snapshot should have the radio buttons checked
        expect(wrapper).toMatchSnapshot();

        wrapper.find('#sort-clear').simulate('click');

        expect(PROPS.clearSort).toHaveBeenCalledTimes(1);

        expect(wrapper).toMatchSnapshot();
    });
});
