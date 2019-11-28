import React from 'react';
import { connect } from 'react-redux';
import { Suspense } from 'react';
import { fetchPassengerDetails } from '../../store/actions';
import './searchBar.scss';

const SnackBar = React.lazy(() => import('./SnackBar'));
const SeatMap = React.lazy(() => import('./seatmap/SeatMap'));
const PassengerDetailTable = React.lazy(() => import('./PassengerDetailTable'));

class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passengerDetails: [],
            flightDetails: undefined,
            selectedSeat: "",
            snackbar: false,
            snackbarMessage: ''
        }

    }
    componentWillMount() {
        this.props.fetchPassengerDetails();
        if (this.props.history.location.state.passenger && this.props.history.location.state.flightDetails) {
            let changeSeatPassengerDetails;
            changeSeatPassengerDetails = this.props.history.location.state.passenger;
            this.setState({
                passengerDetails: [changeSeatPassengerDetails],
                flightDetails: this.props.history.location.state.flightDetails,
                selectedSeat: changeSeatPassengerDetails.seatNumber
            });
        } else if (this.props.history.location.state.airlineId) {
            const flightDetails = this.props.history.location.state;
            this.setState({
                passengerDetails: this.state.passengerDetails,
                flightDetails: flightDetails,
                selectedSeat: this.state.selectedSeat
            });
        }
    }

    fetchPassengerDetails(event, updatedPassengerList) {
        let checkInPassenger = updatedPassengerList.filter((passenger) => {
            return (passenger.id === Number(event.target.value))
        });
        if (checkInPassenger.length && checkInPassenger[0].name) {
            this.setState({
                passengerDetails: checkInPassenger,
                flightDetails: this.state.flightDetails,
                selectedSeat: checkInPassenger[0].seatNumber
            })
        } else {
            this.setState({
                passengerDetails: [],
                flightDetails: this.state.flightDetails,
                selectedSeat: undefined
            })
        }
    }

    onPassengerDetailChange(passenger) {
        const updatedPassengerDetails = [passenger];
        this.setState({ passengerDetails: updatedPassengerDetails, selectedSeat: passenger.seatNumber });
    }

    render() {
        let updatedPassengerList;
        const passengerDetails = this.state.passengerDetails;
        if (this.state.flightDetails && (this.props.passengerList.length > 0)) {
            updatedPassengerList = this.props.passengerList.filter((passenger) => {
                return (passenger.flightId === this.state.flightDetails.flightId)
            });
        }
        return (
            <div className="checkin">
                {
                    this.state.snackbar ?
                        <Suspense fallback={<div>Loading...</div>}>
                            <SnackBar message={this.state.snackbarMessage} open={this.state.snackbar}></SnackBar>
                        </Suspense>
                        : ''
                }
                <div className="container-fluid">
                    <input type="text" className="search-input" name="search" placeholder="Enter PNR Number"
                        onChange={(event) => this.fetchPassengerDetails(event, updatedPassengerList)} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ padding: '2%', overflowX: 'auto' }}>
                        {
                            ((passengerDetails.length === 1) && (passengerDetails[0].name))
                                ?
                                <Suspense fallback={<div>Loading...</div>}>
                                    < PassengerDetailTable
                                        flightDetails={this.state.flightDetails}
                                        passenger={passengerDetails[0]}
                                        selectedSeat={this.state.selectedSeat} />
                                </Suspense>
                                : ""
                        }
                    </div>
                    <div>
                        {
                            (passengerDetails.length === 1 && this.state.flightDetails) ?
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SeatMap
                                        onPassengerDetailChange={
                                            (passenger) => this.onPassengerDetailChange(passenger)
                                        }
                                        passenger={passengerDetails[0]}
                                        seatCheckIn={this.state.flightDetails.seatCheckIns} />
                                </Suspense>
                                : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers
    }
}
export default connect(mapStateToProps,
    {
        fetchPassengerDetails,
    })(CheckIn);