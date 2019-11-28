import React from 'react';
import { connect } from 'react-redux';
import { fetchPassengerDetails, managePassenger, updatePassengerDetails } from '../../store/actions';
import { Field, reduxForm } from 'redux-form';
import SnackBar from './SnackBar';
import SeatMap from './seatmap/SeatMap';
import Button from '@material-ui/core/Button';

class InFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passengerDetails: undefined,
            flightDetails: undefined,
            updateReduxForm: false,
            snackbar: false
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
        this.props.fetchPassengerDetails();
        const managePassenger = this.props.passengerList.filter((passenger) => {
            return (Number(passenger.id) === Number(ticketId));
        });
        this.props.managePassenger(managePassenger[0]);
        this.setState({ updateReduxForm: true });
    }
    onSubmit = (formValues) => {
        this.props.passengerList.forEach((passenger, index) => {
            if (Number(passenger.id) === Number(formValues.id)) {
                this.props.passengerList[index] = formValues;
            }
        });
        this.props.updatePassengerDetails(formValues.id, formValues);
        this.setState({ snackbar: true });
    }

    renderReduxForm() {
        if (this.props.initialValues && this.state.updateReduxForm) {
            return (
                <div style={{ margin: '10px' }}>
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

    onPassengerDetailChange(pnrNumber) {
        this.seatSelected(pnrNumber)
    }
    render() {
        return (
            <div className="flightIn">
                {
                    this.state.snackbar ?
                        <SnackBar
                            message="Details has been updated successfully !"
                            open={this.state.snackbar}
                        ></SnackBar>
                        : ''
                }
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.renderReduxForm()}
                    <SeatMap
                        inFlight="true"
                        onPassengerDetailChange={
                            (pnrNumber) => this.onPassengerDetailChange(pnrNumber)
                        }
                        seatCheckIn={this.state.flightDetails.seatCheckIns} />
                </div>
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
export default connect(mapStateToProps, { fetchPassengerDetails, managePassenger, updatePassengerDetails })(formWrapped);