import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import history from '../../history';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

export class FlightDetails extends React.Component {
    componentDidMount() {
        this.props.fetchFlightDetails();
    }
    cardColor = {
        color: 'white',
        backgroundColor: 'midnightblue',
        margin: '10px',
    };
    onTheWay = {
        display: 'flex',
        justifyContent: 'center'
    };
    flightHeader = {
        textAlign: 'center',
        fontSize: '20px',
        height: '100px',
        verticalAlign: 'middle',
        lineHeight: '100px',
        fontWeight: 'bold',
        fontFamily: 'Arial, Helvetica, sans-serif'
    }

    renderFlightList() {
        return this.props.flights.map((flight) => {
            return (
                <div key={flight.flightId}>
                    <Card style={this.cardColor} >
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2" >
                                <Grid container spacing={3}
                                    style={{ display: 'flex', flexWrap: 'inherit' }}>
                                    <Grid item xs>
                                        <Chip color="primary" label={flight.departureTime} />
                                        <Chip color="primary" label={flight.fromLocation} />
                                    </Grid>
                                    <Grid item xs={6} style={this.onTheWay}>
                                        <ArrowForwardIcon />
                                    </Grid>
                                    <Grid item xs
                                        style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap-reverse' }}>
                                        <Chip color="primary" label={flight.toLocation} />
                                        <Chip color="primary" label={flight.arrivalTime} />
                                    </Grid>
                                </Grid>
                            </Typography>
                        </CardContent>
                        <Tooltip title="checkin">
                            <Button style={this.cardColor} onClick={() =>
                                history.push(`/${flight.airlineId}/checkin`, flight)} >
                                CheckIn
                        </Button>
                        </Tooltip>
                        <Tooltip title="flightIn">
                            <Button style={this.cardColor} onClick={() =>
                                history.push(`/${flight.airlineId}/inflight`, flight)}>
                                FlightIn
                        </Button>
                        </Tooltip>
                        <Tooltip title="passenger list">
                            <Button style={this.cardColor} onClick={() =>
                                history.push(`/${flight.airlineId}/passengerlist`, flight)}>
                                PassengerList
                        </Button>
                        </Tooltip>
                    </Card >
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                <Card style={this.flightHeader}>
                    Currently Scheduled Flights
                </Card>
                {this.renderFlightList()}
            </div>
        );

    }
}
const mapStateToProps = (state) => {
    return {
        flights: state.airline.flights
    }
}
export default connect(mapStateToProps, { fetchFlightDetails })(FlightDetails);