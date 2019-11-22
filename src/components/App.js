import React from 'react';
import Header from './core/Header';
import FlightDetails from './core/FlightDetails';
import { Router, Route } from 'react-router-dom';
import CheckIn from './features/CheckIn';
import InFlight from './features/InFlight';
import PassengerList from './features/PassengerList';
import Adminstrator from './admin/Adminstrator';
import history from '../history';

const App = () => {
    return (
        <Router history={history}>
            <div className="parentWrapper" style={{ fontFamily: 'arial, sans-serif' }}>
                <Header />
                <Route path="/" exact component={FlightDetails} />
                <Route path="/checkin" component={CheckIn} />
                <Route path="/inflight" component={InFlight} />
                <Route path="/passengerlist" component={PassengerList} />
                <Route path="/admin" component={Adminstrator} />
            </div>
        </Router>
    );
}

export default App;