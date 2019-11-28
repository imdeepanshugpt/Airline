import React from 'react';
import Header from './core/Header';
import FlightDetails from './core/FlightDetails';
import { Router, Route } from 'react-router-dom';
import CheckIn from './features/CheckIn';
import InFlight from './features/InFlight';
import PassengerList from './features/PassengerList';
import Adminstrator from './admin/Adminstrator';
import history from '../history';
import './App.scss';

const App = () => {
    return (
        <Router history={history}>
            <div className="wrapper" style={{ fontFamily: 'arial, sans-serif' }}>
                <Header />
                <Route path="/" exact component={FlightDetails} />
                <Route path="/:flightId/checkin" component={CheckIn} />
                <Route path="/:flightId/inflight" component={InFlight} />
                <Route path="/:flightId/passengerlist" component={PassengerList} />
                <Route path="/admin" component={Adminstrator} />
            </div>
        </Router>
    );
}

export default App;