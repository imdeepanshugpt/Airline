import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import './style.css';

class PassengerList extends React.Component {
    componentDidMount() {
        this.props.fetchPassengerDetails();
    }
    filterPassengerList(passengerList) {
        this.flightDetails = this.props.history.location.state;
        this.updatedPassengerList = passengerList.filter((passenger) => {
            return (passenger.ticketInfo.flightId === this.flightDetails.flightId)
        });
    }
    renderPassengerList() {
        const buttonStyle = {
            float: 'right'
        };
        return this.updatedPassengerList.map((passenger) => {
            return (
                <tr key={passenger.ticketInfo.ticketId}>
                    <td>{passenger.name}</td>
                    <td>{passenger.ticketInfo.seatNumber}
                        <Button color="primary" style={buttonStyle}>
                            Change
                        </Button>
                    </td>
                    <td>{passenger.ticketInfo.checkIn}</td>
                    <td>{passenger.ticketInfo.ancillaryService}</td>
                    <td>{passenger.ticketInfo.wheelChair}</td>
                    <td>{passenger.ticketInfo.infants}</td>
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