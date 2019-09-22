import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_FLIGHTS,
    FETCH_PASSENGERS
} from './types';
import airline from '../../apis/airline';
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchFlightDetails = () => async dispatch => {
    const response = await airline.get('/flights');
    dispatch({ type: FETCH_FLIGHTS, payload: response.data });
}

export const fetchPassengerDetails = () => async dispatch => {
    const response = await airline.get('/passengers');
    dispatch({ type: FETCH_PASSENGERS, payload: response.data });
}