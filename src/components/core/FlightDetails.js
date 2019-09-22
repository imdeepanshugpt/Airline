import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import RoomIcon from '@material-ui/icons/Room';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import history from '../../history';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

class FlightDetails extends React.Component {
    componentDidMount() {
        this.props.fetchFlightDetails();
    }
    cardColor = {
        color: 'white',
        backgroundColor: 'midnightblue',
        margin: '10px',
    };
    takeOffIcon = {
        marginLeft: '70px'
    };

    landingIcon = {
        marginRight: '70px'
    }
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
                <Card style={this.cardColor} key={flight.flightId}>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2" >
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Chip color="primary" label={flight.departureTime} />
                                    <Chip color="primary" label={flight.fromLocation} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FlightTakeoffIcon style={this.takeOffIcon} />
                                        ------------------------------------
                                <RoomIcon style={this.landingIcon} />
                                </Grid>
                                <Grid item xs>
                                    <Chip color="primary" label={flight.toLocation} />
                                    <Chip color="primary" label={flight.arrivalTime} />
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                    <Button style={this.cardColor} onClick={() => history.push("/checkin", flight)} >
                        CheckIn
                        </Button>
                    <Button style={this.cardColor} onClick={() => history.push("/inflight", flight)}>
                        FlightIn
                        </Button>
                    <Button style={this.cardColor} onClick={() => history.push("/passengerlist", flight)}>
                        PassengerList
                        </Button>
                </Card >
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