import React from 'react';
import './adminStyle.scss';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchPassengerDetails, fetchFlightDetails, managePassenger, updatePassengerDetails } from '../../store/actions';
import PieChart from './PieChart';
import PassengerList from '../features/PassengerList';
import Button from '@material-ui/core/Button';

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selection: 'Analytics', managePassenger: undefined };
    }
    componentWillMount() {
        this.props.fetchPassengerDetails();
        this.props.fetchFlightDetails();
    }
    setSelection(type) {
        this.setState({ selection: type, managePassenger: this.state.managePassenger });
    }
    renderInput({ input, label }, value) {
        return (
            <div style={{ display: 'block' }}>
                <label style={{
                    display: 'inline-block',
                    width: '400px',
                    textAlign: 'right',
                }}>{label}</label>
                <input type="text"  {...input} className="form-input" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.updatePassengerDetails(formValues.id, formValues);
        this.setState({ selection: 'Manage Passenger', managePassenger: undefined });
    }
    renderPassengerDetails(passenger) {
        return (
            <div>
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
                            <td>{passenger.seatNumber}</td>
                            <td>{passenger.ancillaryService}</td>
                            <td>{passenger.wheelChair}</td>
                            <td>{passenger.infants}</td>
                        </tr>
                    </tbody>
                </table>
                <div>

                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="name" component={this.renderInput} label="Enter Full Name" />
                        <Field name="DOB" component={this.renderInput}
                            label="Date Of Birth"
                        />
                        <Field name="id" component={this.renderInput} label="Enter the PNR Number" />
                        <Field name="ancillaryService" component={this.renderInput}
                            label="Enter the ancillary service" />
                        <Field name="wheelChair" component={this.renderInput}
                            label="Do you need a wheel chair?" />
                        <Field name="infants" component={this.renderInput}
                            label="Are you infant?"
                        />
                        <Field name="passport" component={this.renderInput}
                            label="Passport Number"
                        />
                        <Field name="address" component={this.renderInput}
                            label="Permanent Address"
                        />
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
            </div>
        );
    }
    fetchPassengerDetails(event) {
        let managePassenger = this.props.passengerList.filter((passenger) => {
            return (Number(passenger.id) === Number(event.target.value))
        });
        if (managePassenger.length > 0) {
            this.setState({ selection: this.state.selection, managePassenger: managePassenger[0] });
            this.props.managePassenger(managePassenger[0]);
        } else if (managePassenger.length === 0) {
            this.setState({ selection: this.state.selection, managePassenger: undefined });
        }
    }
    renderAdminData() {
        if (this.state.selection === 'Analytics') {
            return (
                <div className="main">
                    <div className="widget">
                        <div className="title">Number of Passengers</div>
                        <div className="chart">
                            <PieChart passengers={this.props.passengerList.length} seatsAvailable={this.props.flights.length * 60} >
                            </PieChart></div>
                    </div>
                    <div className="widget">
                        <div className="title">Number of Flights</div>
                        <div className="chart" style={{ fontSize: '50px', fontWeight: 'bold' }}>{this.props.flights.length}</div>
                    </div>
                </div>
            );
        } else if (this.state.selection === 'Passenger List') {
            return (
                <div className="passengerlist">
                    <PassengerList adminFlag={true}></PassengerList>
                </div>
            );
        } else if (this.state.selection === 'Manage Passenger') {
            return (
                <div className="managePassenger">
                    <input className="search-input" type="text" name="search" placeholder="Enter PNR Number"
                        onChange={(event) => this.fetchPassengerDetails(event)} />
                    {
                        this.state.managePassenger ?
                            this.renderPassengerDetails(this.state.managePassenger) : ''
                    }
                </div>
            );
        }

    }
    render() {
        return (
            <div className="admin">
                <div className="header">
                </div>
                <div className="side-nav">
                    <div className="logo">
                        <span>Dashboard</span>
                    </div>
                    <nav>
                        <ul style={{ cursor: 'pointer' }}>
                            <li className={(this.state.selection === 'Passenger List') ? 'active' : ''} onClick={() => this.setSelection('Passenger List')}>
                                <span>Passengers List</span>
                            </li>
                            <li className={(this.state.selection === 'Analytics') ? 'active' : ''} onClick={() => this.setSelection('Analytics')}>
                                <span>Analytics</span>
                            </li>
                            <li className={(this.state.selection === 'Manage Passenger') ? 'active' : ''}
                                onClick={() => this.setSelection('Manage Passenger')}>
                                <span>Manage Passenger</span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="main-content">
                    <div className="title">
                        {this.state.selection}
                    </div>
                    {this.renderAdminData()}
                </div>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'passengerDetails'
})(Admin);
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers,
        initialValues: state.airline.managePassenger
    };
}
export default connect(mapStateToProps,
    {
        fetchPassengerDetails,
        fetchFlightDetails,
        managePassenger,
        updatePassengerDetails
    })(formWrapped);