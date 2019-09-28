import React from 'react';
import './adminStyle.scss';
import { connect } from 'react-redux';
import { fetchPassengerDetails, fetchFlightDetails } from '../../store/actions';
import PieChart from './PieChart';

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selection: 'Analytics' };
    }
    componentWillMount() {
        this.props.fetchPassengerDetails();
        this.props.fetchFlightDetails();
    }
    setSelection(type) {
        this.setState({ selection: type });
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
                        <div className="chart">{this.props.flights.length}</div>
                    </div>
                </div>
            );
        } else if (this.state.selection === 'Passenger List') {
            return (
                <div>
                    PassengerList
                </div>
            );
        } else if (this.state.selection === 'Manage Passenger') {
            return (
                <div>
                    Manage Passenger
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
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers
    };
}
export default connect(mapStateToProps, { fetchPassengerDetails, fetchFlightDetails })(Admin);