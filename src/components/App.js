import React from 'react';
import Header from './core/Header';
import FlightDetails from './core/FlightDetails';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CheckIn from './features/CheckIn';
import InFlight from './features/InFlight';
import PassengerList from './features/PassengerList';
import Adminstrator from './admin/Adminstrator';
import history from '../history';
import Footer from './core/Footer';
import './App.scss';

const App = (props) => {
    const authenticate = props.isSignedIn;
    return (
        <Router history={history}>
            <div className="wrapper" style={{ fontFamily: 'arial, sans-serif' }}>
                <Header />
                <div className="router-box">
                    {
                        authenticate ?
                            <React.Fragment>
                                <Route path="/" exact component={FlightDetails} />
                                <Route path="/:flightId/checkin" component={CheckIn} />
                                <Route path="/:flightId/inflight" component={InFlight} />
                                <Route path="/:flightId/passengerlist" component={PassengerList} />
                                <Route path="/admin" component={Adminstrator} />
                            </React.Fragment>
                            :
                            <h1 className="authenticate">
                                You need to be authenticated to view ! Please login.
                            </h1>
                    }
                </div>
                <Footer />
            </div>
        </Router>
    );
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}
export default connect(mapStateToProps, null)(App);