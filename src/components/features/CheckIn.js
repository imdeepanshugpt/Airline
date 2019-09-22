import React from 'react';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../../store/actions';

class CheckIn extends React.Component {
    componentDidMount() {
        this.props.fetchFlightDetails();

    }
    render() {
        console.log(this.props.history.location.state);
        return(
            <div>
                CheckIn
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn : state.auth.isSignedIn,
        flights : state.airline.flights
    }
}
export default connect(mapStateToProps, { fetchFlightDetails })(CheckIn);