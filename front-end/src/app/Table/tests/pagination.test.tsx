import '@testing-library/react';

import { shallow } from 'enzyme';
import { PaginationComponent, PaginationProps } from '../pagination';

describe('Pagination component', () => {

    const PROPS: PaginationProps = {
        nextPage: jest.fn(),
        previousPage: jest.fn(),
        hasNextPage: false,
        hasPreviousPage: false
    };

    it('is null if no next page or previous page', () => {
        const wrapper = shallow(<PaginationComponent {...PROPS} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with only next page enabled', () => {
        const wrapper = shallow(<PaginationComponent {...PROPS} hasNextPage />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with only previous page enabled', () => {
        const wrapper = shallow(<PaginationComponent {...PROPS} hasPreviousPage />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with only both enabled', () => {
        const wrapper = shallow(<PaginationComponent {...PROPS} hasPreviousPage hasNextPage />);

        expect(wrapper).toMatchSnapshot();
    });
});