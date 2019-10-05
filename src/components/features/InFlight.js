import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails, managePassenger } from '../../store/actions';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class InFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightDetails: undefined,
            updateReduxForm: false
        };
    }
    componentWillMount() {
        this.props.fetchPassengerDetails();
        const flightDetails = this.props.history.location.state;
        this.setState({ flightDetails: flightDetails });
    }
    renderInput({ input, label }) {
        const inputStyle = {
            float: 'right',
            height: '36px',
            width: '326px',
            marginLeft: '20px',
            marginBottom: '20px',
            boxSizing: 'border-box',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: 'white',
            backgroundPosition: '10px 10px',
            backgroundRepeat: 'no-repeat'

        };
        return (
            <div style={{ display: 'block' }}>
                <label style={{
                    display: 'inline-block',
                    marginLeft: '10px',
                    marginTop: '10px',
                    marginBottom: '40px',
                    textAlign: 'left',
                }}>{label}</label>
                <input type="text"  {...input} style={inputStyle} />
            </div>
        );
    }
    seatSelected(ticketId) {
        const managePassenger = this.props.passengerList.filter((passenger) => {
            return (Number(passenger.id) === Number(ticketId));
        });
        this.props.managePassenger(managePassenger[0]);
        this.setState({ updateReduxForm: true });
    }
    onSubmit = (formValues) => {
        this.props.updatePassengerDetails(formValues.id, formValues);
        this.setState({ selection: 'Manage Passenger', managePassenger: undefined });
    }
    renderSeatButtons(seats) {
        return Object.keys(seats).map((seat, index) => {
            const seatOrder = seats[index][index + 1];
            const seatindex = index + 1;
            return (
                <li className="row" key={seatindex}>
                    <ol className="seats" type="A">
                        <li onClick={() => { this.seatSelected(seatOrder[0]) }}
                            className={(seatOrder[0] !== "") ? 'seat seatChecked' : "seat"}  >
                            <input type="checkbox" id={"A" + index} defaultChecked={(seatOrder[0] !== "")}
                                disabled={(seatOrder[0] !== "")} />
                            <label htmlFor={"A" + index}>{seatindex}A</label>
                        </li>
                        <li onClick={() => { this.seatSelected(seatOrder[1]) }}
                            className={(seatOrder[1] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"B" + index} defaultChecked={(seatOrder[1] !== "")}
                                disabled={(seatOrder[1] !== "")} />
                            <label htmlFor={"B" + index}>{seatindex}B</label>
                        </li>
                        <li onClick={() => { this.seatSelected(seatOrder[2]) }}
                            className={(seatOrder[2] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"C" + index} defaultChecked={(seatOrder[2] !== "")}
                                disabled={(seatOrder[2] !== "")} />
                            <label htmlFor={"C" + index}>{seatindex}C</label>
                        </li>
                        <li onClick={() => { this.seatSelected(seatOrder[3]) }}
                            className={(seatOrder[3] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"D" + index} defaultChecked={(seatOrder[3] !== "")}
                                disabled={(seatOrder[3] !== "")} />
                            <label htmlFor={"D" + index}>{seatindex}D</label>
                        </li>
                        <li onClick={() => { this.seatSelected(seatOrder[4]) }}
                            className={(seatOrder[4] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"E" + index} defaultChecked={(seatOrder[4] !== "")}
                                disabled={(seatOrder[4] !== "")} />
                            <label htmlFor={"E" + index}>{seatindex}E</label>
                        </li>
                        <li onClick={() => { this.seatSelected(seatOrder[5]) }}
                            className={(seatOrder[5] !== "") ? 'seat seatChecked' : "seat"}>
                            <input type="checkbox" id={"F" + index} defaultChecked={(seatOrder[5] !== "")}
                                disabled={(seatOrder[5] !== "")} />
                            <label htmlFor={"F" + index}>{seatindex}F</label>
                        </li>
                    </ol>
                </li>
            )
        })
    }
    renderReduxForm() {
        if (this.props.initialValues && this.state.updateReduxForm) {
            return (
                <div style={{ position: 'sticky', top: '100px' }}>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="name" component={this.renderInput} label="Full Name" />
                        <Field name="seatNumber" component={this.renderInput} label="Seat Number" />
                        <Field name="id" component={this.renderInput} label="PNR Number" />
                        <Field name="ancillaryService" component={this.renderInput}
                            label="Ancillary service" />
                        <Field name="meals" component={this.renderInput}
                            label="Meals"
                        />
                        <Field name="shoppingDeal" component={this.renderInput}
                            label="Shopping Deal"
                        />
                        <Button style={{
                            display: 'block',
                            margin: 'auto',
                            backgroundColor: '#3f51b5',
                            color: 'white'
                        }} type="submit">
                            Update
                    </Button>
                    </form>
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: 'center', margin: '50px', position: 'sticky', top: '100px' }}>
                    Please select the occupied seat to see the passenger details
                </div>
            );
        }
    }
    render() {
        return (
            <div className="flightIn">
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ position: 'relative' }}>
                        {this.renderReduxForm()}
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const formWrapped = reduxForm({
    form: 'passengerDetails',
    enableReinitialize: true
})(InFlight);
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers,
        initialValues: state.airline.managePassenger
    }
}
export default connect(mapStateToProps, { fetchPassengerDetails, managePassenger })(formWrapped);