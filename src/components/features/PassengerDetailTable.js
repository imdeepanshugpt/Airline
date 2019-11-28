import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { updatePassengerDetails, updateFlightDetails } from '../../store/actions';
import { connect } from 'react-redux';

const PassengerDetailTable = (props) => {
    const passenger = props.passenger;
    const selectedSeat = props.selectedSeat;
    const confirmSeat = () => {
        const passengerDetails = props.passenger;
        props.updatePassengerDetails(passengerDetails.id, passengerDetails);
        setFlightDetails(passengerDetails.id, passengerDetails.seatNumber);
    }

    const setFlightDetails = (pnrNumber, seatNumber) => {
        const flightDetails = props.flightDetails;
        const key = (Number(seatNumber[0])).toString();
        const seatChar = seatNumber[1];
        const seatIndex = Number(seatNumber[0]) - 1;
        flightDetails.seatCheckIns.forEach((row, seatCheckIndex) => {
            row[seatCheckIndex + 1].forEach((seat, seatIndex) => {
                if (seat === pnrNumber.toString()) {
                    const rowKey = (seatCheckIndex + 1).toString();
                    flightDetails.seatCheckIns[seatCheckIndex][rowKey][seatIndex] = "";
                }
            });
        });
        switch (seatChar) {
            case 'A':
                flightDetails.seatCheckIns[seatIndex][key][0] = pnrNumber.toString();
                break;
            case 'B':
                flightDetails.seatCheckIns[seatIndex][key][1] = pnrNumber.toString();
                break;
            case 'C':
                flightDetails.seatCheckIns[seatIndex][key][2] = pnrNumber.toString();
                break;
            case 'D':
                flightDetails.seatCheckIns[seatIndex][key][3] = pnrNumber.toString();
                break;
            case 'E':
                flightDetails.seatCheckIns[seatIndex][key][4] = pnrNumber.toString();
                break;
            case 'F':
                flightDetails.seatCheckIns[seatIndex][key][5] = pnrNumber.toString();
                break;
            default:
                break;
        }
        props.updateFlightDetails(flightDetails.id, flightDetails);
    }
    return (
        <Paper style={{ margin: '10px', overflowX: 'auto', width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>PNR Number</TableCell>
                        <TableCell>Seat Number</TableCell>
                        <TableCell>Ancillary services</TableCell>
                        <TableCell>Wheel chair</TableCell>
                        <TableCell>Infant</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{passenger.name}</TableCell>
                        <TableCell>{passenger.id}</TableCell>
                        <TableCell>{selectedSeat}</TableCell>
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
            <Button onClick={confirmSeat} color="primary">
                {selectedSeat ? 'Modify' : 'CheckIn'}
            </Button>
        </Paper>
    );
}

export default connect(null, { updateFlightDetails, updatePassengerDetails })(PassengerDetailTable);