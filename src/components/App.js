import React from 'react';
import Header from './core/Header';
import Home from './core/Home';
import { Router, Route } from 'react-router-dom';
import CheckIn from './features/CheckIn';
import InFlight from './features/InFlight';
import PassengerList from './features/PassengerList';
import history from '../history';

const App = () => {
    return (
        <Router  history={history}>
            <div>
                <Header />
                <Home />
                <Route path="/" exact component={CheckIn} />
                <Route path="/inflight" component={InFlight} />
                <Route path="/passengerlist" component={PassengerList} />
            </div>
        </Router>
    );
}

export default App;