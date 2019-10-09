import React from 'react';
import { shallow} from 'enzyme';
import Button from '@material-ui/core/Button';
import {FlightDetails} from './FlightDetails';

const enzyme = require('enzyme');
const enzymeAdapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new enzymeAdapter() });
let wrapper;
let flights=[{}]
let fetchFlightDetails=jest.fn()

beforeEach(() => {
     wrapper = shallow(<FlightDetails flights={flights} fetchFlightDetails={fetchFlightDetails}/>);
  });


describe('<FlightDetails />', () => {
    it('renders three <Foo /> components', () => {
      expect(wrapper.find(Button).length).toBe(3);
    });

    it('renders three <Foo /> components', () => {
        expect(wrapper.find(Button).at(0).prop('children')).toEqual("CheckIn");
      });
})