import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import './style.scss';

class PassengerList extends React.Component {
    componentDidMount() {
        this.props.fetchPassengerDetails();
    }
    filterPassengerList(passengerList) {
        this.flightDetails = this.props.history.location.state;
        this.updatedPassengerList = passengerList.filter((passenger) => {
            return (passenger.flightId === this.flightDetails.flightId)
        });
    }
    renderPassengerList() {
        const buttonStyle = {
            float: 'right'
        };
        return this.updatedPassengerList.map((passenger) => {
            return (
                <tr key={passenger.id}>
                    <td>{passenger.name}</td>
                    <td>{passenger.id}</td>
                    <td>{passenger.seatNumber}
                        <Button color="primary" style={buttonStyle}>
                            Change
                        </Button>
                    </td>
                    <td>{passenger.checkIn}</td>
                    <td>{passenger.ancillaryService}</td>
                    <td>{passenger.wheelChair}</td>
                    <td>{passenger.infants}</td>
                </tr>
            )
        });
    }
    handleChange = name => event => {
        this.setState({ ...this.props.passengerList, [name]: event.target.checked });
    };
    render() {
        this.filterPassengerList(this.props.passengerList);
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>PNR Number</th>
                            <th>Seat Number</th>
                            <th>Checked In</th>
                            <th>Ancillary services</th>
                            <th>wheel chair</th>
                            <th>Infant</th>
                        </tr>
                        {this.renderPassengerList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        passengerList: state.airline.passengers,
        checkedIn : true
    };
}
export default connect(mapStateToProps, { fetchPassengerDetails })(PassengerList);