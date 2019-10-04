import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import './style.scss';
import history from '../../history';

class PassengerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { flightDetails: undefined };
    }
    componentWillMount() {
        if (!this.props.adminFlag) {
            this.setState({ flightDetails: this.props.history.location.state });
        }
    }
    componentDidMount() {
        this.props.fetchPassengerDetails();
    }
    filterPassengerList(passengerList) {
        if (passengerList.length > 0 && !(this.props.adminFlag)) {
            this.updatedPassengerList = passengerList.filter((passenger) => {
                return (passenger.flightId === this.state.flightDetails.flightId)
            });
        } else if (this.props.adminFlag) {
            this.updatedPassengerList = passengerList;
        }
    }
    changeSeat(passenger) {
        history.push("/checkin", { passenger, flightDetails: this.state.flightDetails });
    }
    renderPassengerList() {
        const buttonStyle = {
            float: 'right'
        };
        if (this.updatedPassengerList && this.updatedPassengerList.length > 0) {
            return this.updatedPassengerList.map((passenger) => {
                return (
                    <tr key={passenger.id}>
                        <td>{passenger.name}</td>
                        <td>{passenger.id}</td>
                        <td>{passenger.seatNumber}
                            {!this.props.adminFlag ?
                                <Button color="primary" style={buttonStyle} onClick={() => this.changeSeat(passenger)}>
                                    Change
                            </Button>
                                : ''
                            }
                        </td>
                        <td>{passenger.checkIn}</td>
                        <td>{passenger.ancillaryService}</td>
                        <td>{passenger.wheelChair}</td>
                        <td>{passenger.infants}</td>
                    </tr>
                )
            });
        }
    }
    handleChange = name => event => {
        this.setState({ ...this.props.passengerList, [name]: event.target.checked });
    };
    render() {
        if (this.props.passengerList && (this.props.passengerList.length > 0)) {
            this.filterPassengerList(this.props.passengerList);
        }
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
        checkedIn: true
    };
}
export default connect(mapStateToProps, { fetchPassengerDetails })(PassengerList);