import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { FlightDetails } from './FlightDetails';

const enzyme = require('enzyme');
const enzymeAdapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new enzymeAdapter() });
let wrapper;
let flights = [{
  "id": "1",
  "airlineId": 1,
  "airlineName": "Wordify",
  "arrivalTime": "04:46",
  "availableSeats": 60,
  "departureTime": "11:46",
  "duration": 1.52,
  "flightDepartureDate": "10/10/2019",
  "flightId": "121",
  "fromLocation": "Talok",
  "price": 7925,
  "seatCheckIns": [
    {
      "1": [
        "",
        "",
        "",
        "",
        "5976",
        ""
      ]
    },
    {
      "2": [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "3": [
        "",
        "3153",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "4": [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "5": [
        "",
        "",
        "",
        "3386",
        "",
        ""
      ]
    },
    {
      "6": [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "7": [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "8": [
        "",
        "",
        "",
        "",
        "",
        "5694"
      ]
    },
    {
      "9": [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    },
    {
      "10": [
        "",
        "",
        "",
        "",
        "",
        "1510"
      ]
    }
  ],
  "toLocation": "Mitrovicë",
  "totalSeats": 60
}]
let fetchFlightDetails = jest.fn()

beforeEach(() => {
  wrapper = shallow(<FlightDetails flights={flights} fetchFlightDetails={fetchFlightDetails} />);
});


describe('<FlightDetails />', () => {
  it('renders three <Foo /> components', () => {
    expect(wrapper.find(Button).length).toBe(3);
  });

  it('renders three <Foo /> components', () => {
    expect(wrapper.find(Button).at(0).prop('children')).toEqual("CheckIn");
  });
  it('should check for props', () => {
    wrapper.setProps({ flights: flights });
    expect(wrapper.instance().props.flights.length).toEqual(1);
  });
  it('should check state content after api call', () => {
    wrapper.setProps({ flights: flights });
    expect(wrapper.instance().props.flights[0].availableSeats).toBe(60);
    expect(wrapper.instance().props.flights[0].airlineName).toBe("Wordify");
    expect(wrapper.instance().props.flights[0].fromLocation).toBe("Talok");
    expect(wrapper.instance().props.flights[0].seatCheckIns.length).toBe(10);
  });
})