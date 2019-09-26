import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails, updatePassengerDetails, updateFlightDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './seatMap.scss';

class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            selectedSeat: ""
        }

    }
    componentDidMount() {
        this.props.fetchPassengerDetails();
    }

    seatSelected(index, seatType) {
        this.setState({ details: this.state.details, selectedSeat: (index + 1) + seatType });
    }
    renderSeatButtons(seats) {
        return Object.keys(seats).map((seat, index) => {
            const searOrder = seats[seat];
            const seatindex = index + 1;
            return (
                <li className="row" key={seatindex}>
                    <ol className="seats" type="A">
                        <li className={((seatindex + 'A') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"} >
                            <input type="checkbox" id={"A" + index} checked={(searOrder[0] !== "")}
                                onClick={() => { this.seatSelected(index, "A") }} />
                            <label htmlFor={"A" + index}>{seatindex}A</label>
                        </li>
                        <li className={((seatindex + 'B') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"B" + index} checked={(searOrder[1] !== "")}
                                onClick={() => { this.seatSelected(index, "B") }} />
                            <label htmlFor={"B" + index}>{seatindex}B</label>
                        </li>
                        <li className={((seatindex + 'C') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"C" + index} checked={(searOrder[2] !== "")}
                                onClick={() => { this.seatSelected(index, "C") }} />
                            <label htmlFor={"C" + index}>{seatindex}C</label>
                        </li>
                        <li className={((seatindex + 'D') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"D" + index} checked={(searOrder[3] !== "")}
                                onClick={() => { this.seatSelected(index, "D") }} />
                            <label htmlFor={"D" + index}>{seatindex}D</label>
                        </li>
                        <li className={((seatindex + 'E') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"E" + index} checked={(searOrder[4] !== "")}
                                onClick={() => { this.seatSelected(index, "E") }} />
                            <label htmlFor={"E" + index}>{seatindex}E</label>
                        </li>
                        <li className={((seatindex + 'F') === this.state.selectedSeat) ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"F" + index} checked={(searOrder[5] !== "")}
                                onClick={() => { this.seatSelected(index, "F") }} />
                            <label htmlFor={"F" + index}>{seatindex}F</label>
                        </li>
                    </ol>
                </li>
            )
        })
    }
    fetchPassengerDetails = (event) => {
        let checkInPassenger = this.updatedPassengerList.filter((passenger) => {
            return (passenger.id === Number(event.target.value))
        });
        if (checkInPassenger.length && checkInPassenger[0].name) {
            this.setState({
                details: checkInPassenger,
                selectedSeat: checkInPassenger[0].seatNumber
            })
        } else {
            this.setState({
                details: []
            })
        }
    }
    confirmSeat = () => {
        const passengerDetails = this.state.details;
        passengerDetails[0].seatNumber = this.state.selectedSeat;
        this.setState({ details: passengerDetails, selectedSeat: this.state.selectedSeat });
        this.props.updatePassengerDetails(passengerDetails[0].id, passengerDetails[0]);
        this.setFlightDetails(Number(this.state.selectedSeat.charAt(0)) - 1, this.state.selectedSeat.charAt(1), passengerDetails[0].id);
    }
    setFlightDetails(index, seatType, pnrNumber) {
        const flightDetails = this.props.history.location.state;
        const key = (index + 1).toString();
        flightDetails.seatCheckIns.forEach((row, seatCheckIndex) => {
            row[seatCheckIndex + 1].forEach((seat, seatIndex) => {
                if (seat === pnrNumber.toString()) {
                    const rowKey = (seatCheckIndex + 1).toString();
                    flightDetails.seatCheckIns[seatCheckIndex][rowKey][seatIndex] = "";
                }
            });
        });
        switch (seatType) {
            case 'A':
                flightDetails.seatCheckIns[index][key][0] = pnrNumber.toString();
                break;
            case 'B':
                flightDetails.seatCheckIns[index][key][1] = pnrNumber.toString();
                break;
            case 'C':
                flightDetails.seatCheckIns[index][key][2] = pnrNumber.toString();
                break;
            case 'D':
                flightDetails.seatCheckIns[index][key][3] = pnrNumber.toString();
                break;
            case 'E':
                flightDetails.seatCheckIns[index][key][4] = pnrNumber.toString();
                break;
            case 'F':
                flightDetails.seatCheckIns[index][key][5] = pnrNumber.toString();
                break;
            default:
                break;
        }
        this.props.updateFlightDetails(flightDetails.id, flightDetails);

    }
    renderPassengerDetails = (passenger) => {
        return (
            <div className="passenger-details" style={{ position: 'sticky', top: '100px' }}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>PNR Number</th>
                            <th>Seat Number</th>
                            <th>Ancillary services</th>
                            <th>wheel chair</th>
                            <th>Infant</th>
                        </tr>
                        <tr>
                            <td>{passenger.name}</td>
                            <td>{passenger.id}</td>
                            <td>{this.state.selectedSeat}</td>
                            <td>{passenger.ancillaryService}</td>
                            <td>{passenger.wheelChair}</td>
                            <td>{passenger.infants}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={this.confirmSeat} color="primary">
                    {this.state.selectedSeat ? 'Modify' : 'CheckIn'}
                </Button>
            </div>
        );
    }
    render() {
        const passengerDetails = this.state.details;
        this.flightDetails = this.props.history.location.state;
        this.updatedPassengerList = this.props.passengerList.filter((passenger) => {
            return (passenger.flightId === this.flightDetails.flightId)
        });
        return (
            <div className="checkin">
                <div className="container-fluid">
                    <input type="text" name="search" placeholder="Enter PNR Number" onChange={this.fetchPassengerDetails} />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ position: 'relative' }}>
                        {((passengerDetails.length === 1) && (passengerDetails[0].name)) ? this.renderPassengerDetails(passengerDetails[0]) : ""}
                    </Grid>
                    <Grid item xs={6}>
                        {
                            (passengerDetails.length === 1) ?
                                <div className="plane">
                                    <div className="cockpit">
                                        <h1>Please select a seat</h1>
                                    </div>
                                    <div className="exit exit--front fuselage"></div>
                                    <ol className="cabin fuselage">
                                        {this.renderSeatButtons(this.flightDetails.seatCheckIns)}
                                    </ol>
                                    <div className="exit exit--back fuselage"></div>
                                </div>
                                : ''
                        }
                    </Grid>
                </Grid>
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
        updatePassengerDetails,
        updateFlightDetails
    })(CheckIn);