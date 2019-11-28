import React from 'react';
import SeatButton from './SeatButton';
import Grid from '@material-ui/core/Grid';
import SnackBar from '../SnackBar';

class SeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: false,
            snackbarMessage: 'Seat is already occupied. Please select another seat!'
        };
    }

    seatSelected(seat, color, pnrNumber) {
        if (this.props.inFlight) {
            this.props.onPassengerDetailChange(pnrNumber);
        } else {
            if (color === "") {
                this.setState({ snackbar: false });
                this.props.passenger.seatNumber = seat;
                this.props.onPassengerDetailChange(this.props.passenger);
            } else if (color === "darkred") {
                this.setState({ snackbar: true });
            }
        }
    }
    renderRowSeats = (index, checkInRow) => {
        let rowSeats = ["A", "B", "C", "D", "E", "F"];
        let renderingRow = [];
        let color = "";
        rowSeats.forEach((seatNumber, arrayIndex) => {
            if (checkInRow[arrayIndex] !== "") {
                color = "darkred";
            } else {
                color = "";
            }
            if (arrayIndex === 3) {
                renderingRow.push(
                    <div key={arrayIndex} style={{ background: 'white', width: '40px' }}></div>
                );
            }
            renderingRow.push(
                <SeatButton
                    onClick={
                        (event, buttonColor) => {
                            this.seatSelected(((index) + seatNumber), buttonColor, checkInRow[arrayIndex])
                        }
                    }
                    key={(index) + seatNumber}
                    color={color}
                    seatNumber={(index) + seatNumber} />
            );
        });
        return renderingRow;
    }

    renderRows() {
        const { seatCheckIn } = this.props;
        let rows = [];
        for (let i = 1; i <= 10; i++) {
            rows.push(
                <Grid container item xs={12} spacing={3} key={i} >
                    {this.renderRowSeats(i, seatCheckIn[i - 1][i])}
                </Grid>
            );
        }
        return rows;
    }

    renderSeatColorInfo() {
        let colorCodes = [
            {
                "color": "",
                "name": "Free Seats"
            },
            {
                "color": "darkred",
                "name": "Occupied Seats"
            }
        ];
        let renderingcolorInfo = [];
        colorCodes.forEach((element) => {
            renderingcolorInfo.push(
                <div style={{ display: 'flex' }} key={element.name}>
                    <SeatButton color={element.color} onClick={(event) => event.stopPropagation()} />
                    <h6 style={{
                        textAlign: 'center',
                        marginTop: '15px'
                    }}>{element.name}</h6>
                </div>
            );
        });
        return renderingcolorInfo;
    }

    render() {
        return (
            <div className="seatmap" style={{ margin: '10px', border: 'solid 5px darkred' }} >
                <Grid container spacing={1} style={{ width: '380px', background: 'aliceblue' }}>
                    <Grid container item xs={12} spacing={3} style={{ margin: '3px', display: 'flex', justifyContent: 'space-between' }}>
                        {this.renderSeatColorInfo()}
                    </Grid>
                    {this.renderRows()}
                </Grid>
                <SnackBar message={this.state.snackbarMessage} open={this.state.snackbar}></SnackBar>
            </div>
        );
    }
}

export default SeatMap;
