import '@testing-library/react';

import { shallow } from 'enzyme';

import { InputsComponent, InputsProps } from '../inputs';

describe('Inputs component', () => {
    const PROPS: InputsProps = {
        csvLink: 'csvLink'
    };

    it('renders', () => {
        const wrapper = shallow(<InputsComponent {...PROPS} />);

        expect(wrapper).toMatchSnapshot();
    });
});
