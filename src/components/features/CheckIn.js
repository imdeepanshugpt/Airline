import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails, updatePassengerDetails, updateFlightDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './seatMap.scss';
import SnackBar from './SnackBar';

class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passengerDetails: [],
            flightDetails: undefined,
            selectedSeat: "",
            seatIndex: null,
            seatChar: null,
            snackbar: false,
            snackbarMessage: ''
        }

    }
    componentWillMount() {
        this.props.fetchPassengerDetails();
        if (this.props.history.location.state.passenger && this.props.history.location.state.flightDetails) {
            let changeSeatPassengerDetails;
            changeSeatPassengerDetails = this.props.history.location.state.passenger;
            this.setState({ passengerDetails: [changeSeatPassengerDetails], flightDetails: this.props.history.location.state.flightDetails, selectedSeat: changeSeatPassengerDetails.seatNumber, seatIndex: this.state.seatIndex, seatChar: this.state.seatType });
        } else if (this.props.history.location.state.airlineId) {
            const flightDetails = this.props.history.location.state;
            this.setState({ passengerDetails: this.state.passengerDetails, flightDetails: flightDetails, selectedSeat: this.state.selectedSeat, seatIndex: this.state.seatIndex, seatChar: this.state.seatType });
        }
    }

    seatSelected(index, seatType, alreadySelected) {
        if (!alreadySelected) {
            this.setState({ selectedSeat: ((index + 1) + seatType), seatIndex: index, seatChar: seatType });
            this.setState({ snackbar: false });
        } else {
            this.setState({ snackbar: true, snackbarMessage: 'Seat is already occupied. Please select another seat !' });
        }
    }

    renderSeatButtons(seats) {
        return Object.keys(seats).map((seat, index) => {
            const seatOrder = seats[index][index + 1];
            console.log(seatOrder);
            const seatindex = index + 1;
            return (
                <li className="row" key={seatindex}>
                    <ol className="seats" type="A">
                        <li
                            className={((seatindex + 'A') === this.state.selectedSeat) || (seatOrder[0] !== "") ? 'seat seatChecked' : "seat"} >
                            <input type="checkbox" id={"A" + index} defaultChecked={(seatOrder[0] !== "")}
                                onClick={() => { this.seatSelected(index, "A", seatOrder[0]) }} />
                            <label htmlFor={"A" + index}>{seatindex}A</label>
                        </li>
                        <li
                            className={((seatindex + 'B') === this.state.selectedSeat) || (seatOrder[1] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"B" + index}
                                defaultChecked={(seatOrder[1] !== "")}
                                onClick={() => { this.seatSelected(index, "B", seatOrder[1]) }} />
                            <label htmlFor={"B" + index}>{seatindex}B</label>
                        </li>
                        <li className={((seatindex + 'C') === this.state.selectedSeat) || (seatOrder[2] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox"
                                id={"C" + index} defaultChecked={(seatOrder[2] !== "")}
                                onClick={() => { this.seatSelected(index, "C", seatOrder[2]) }} />
                            <label htmlFor={"C" + index}>{seatindex}C</label>
                        </li>
                        <li className={((seatindex + 'D') === this.state.selectedSeat) || (seatOrder[3] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox"
                                id={"D" + index} defaultChecked={(seatOrder[3] !== "")}
                                onClick={() => { this.seatSelected(index, "D", seatOrder[3]) }} />
                            <label htmlFor={"D" + index}>{seatindex}D</label>
                        </li>
                        <li className={((seatindex + 'E') === this.state.selectedSeat) || (seatOrder[4] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox"
                                id={"E" + index} defaultChecked={(seatOrder[4] !== "")}
                                onClick={() => { this.seatSelected(index, "E", seatOrder[4]) }} />
                            <label htmlFor={"E" + index}>{seatindex}E</label>
                        </li>
                        <li className={((seatindex + 'F') === this.state.selectedSeat) || (seatOrder[5] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox"
                                id={"F" + index} defaultChecked={(seatOrder[5] !== "")}
                                onClick={() => { this.seatSelected(index, "F", seatOrder[5]) }} />
                            <label htmlFor={"F" + index}>{seatindex}F</label>
                        </li>
                    </ol>
                </li>
            )
        })
    }
    fetchPassengerDetails(event, updatedPassengerList) {
        let checkInPassenger = updatedPassengerList.filter((passenger) => {
            return (passenger.id === Number(event.target.value))
        });
        if (checkInPassenger.length && checkInPassenger[0].name) {
            this.setState({
                passengerDetails: checkInPassenger,
                flightDetails: this.state.flightDetails,
                selectedSeat: checkInPassenger[0].seatNumber,
                seatIndex: this.state.seatIndex,
                seatChar: this.state.seatChar
            })
        } else {
            this.setState({
                passengerDetails: [],
                flightDetails: this.state.flightDetails,
                selectedSeat: undefined,
                seatIndex: undefined,
                seatChar: undefined
            })
        }
    }
    confirmSeat = () => {
        const passengerDetails = this.state.passengerDetails;
        passengerDetails[0].seatNumber = this.state.selectedSeat;
        this.props.updatePassengerDetails(passengerDetails[0].id, passengerDetails[0]);
        this.setFlightDetails(passengerDetails[0].id);
    }
    setFlightDetails(pnrNumber) {
        const flightDetails = this.state.flightDetails;
        const key = (this.state.seatIndex + 1).toString();
        flightDetails.seatCheckIns.forEach((row, seatCheckIndex) => {
            row[seatCheckIndex + 1].forEach((seat, seatIndex) => {
                if (seat === pnrNumber.toString()) {
                    const rowKey = (seatCheckIndex + 1).toString();
                    flightDetails.seatCheckIns[seatCheckIndex][rowKey][seatIndex] = "";
                }
            });
        });
        switch (this.state.seatChar) {
            case 'A':
                flightDetails.seatCheckIns[this.state.seatIndex][key][0] = pnrNumber.toString();
                break;
            case 'B':
                flightDetails.seatCheckIns[this.state.seatIndex][key][1] = pnrNumber.toString();
                break;
            case 'C':
                flightDetails.seatCheckIns[this.state.seatIndex][key][2] = pnrNumber.toString();
                break;
            case 'D':
                flightDetails.seatCheckIns[this.state.seatIndex][key][3] = pnrNumber.toString();
                break;
            case 'E':
                flightDetails.seatCheckIns[this.state.seatIndex][key][4] = pnrNumber.toString();
                break;
            case 'F':
                flightDetails.seatCheckIns[this.state.seatIndex][key][5] = pnrNumber.toString();
                break;
            default:
                break;
        }
        this.props.updateFlightDetails(flightDetails.id, flightDetails);
        this.setState({ snackbar: true, snackbarMessage: 'Details has been updated successfully !' });
    }
    renderPassengerDetails = (passenger) => {
        return (
            <div className="passenger-details" style={{ position: 'sticky', top: '100px' }}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>PNR Number</TableCell>
                                <TableCell>Seat Number</TableCell>
                                <TableCell>Ancillary services</TableCell>
                                <TableCell>wheel chair</TableCell>
                                <TableCell>Infant</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{passenger.name}</TableCell>
                                <TableCell>{passenger.id}</TableCell>
                                <TableCell>{this.state.selectedSeat}</TableCell>
                                <TableCell>{passenger.ancillaryService}</TableCell>
                                <TableCell>
                                    {passenger.wheelChair ?
                                        ((passenger.wheelChair === "Yes") || (passenger.wheelChair === true)) ?
                                            "Yes" : "No" : 'No'
                                    }
                                </TableCell>
                                <TableCell>
                                    {passenger.infants ?
                                        ((passenger.infants === "Yes") || (passenger.infants === true)) ?
                                            "Yes" : "No" : 'No'
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button onClick={this.confirmSeat} color="primary">
                        {this.state.selectedSeat ? 'Modify' : 'CheckIn'}
                    </Button>
                </Paper>
            </div>
        );
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
                {this.state.snackbar ? <SnackBar message={this.state.snackbarMessage} open={this.state.snackbar}></SnackBar> : ''}
                <div className="container-fluid">
                    <input type="text" className="search-input" name="search" placeholder="Enter PNR Number"
                        onChange={(event) => this.fetchPassengerDetails(event, updatedPassengerList)} />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ position: 'relative' }}>
                        {((passengerDetails.length === 1) && (passengerDetails[0].name)) ? this.renderPassengerDetails(passengerDetails[0]) : ""}
                    </Grid>
                    <Grid item xs={6}>
                        {
                            (passengerDetails.length === 1 && this.state.flightDetails) ?
                                <div className="plane">
                                    <div className="cockpit">
                                        <h1>Please select a seat</h1>
                                    </div>
                                    <div className="exit exit--front fuselage"></div>
                                    <ol className="cabin fuselage">
                                        {this.renderSeatButtons(this.state.flightDetails.seatCheckIns)}
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