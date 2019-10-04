import {
    FETCH_FLIGHTS,
    FETCH_PASSENGERS,
    UPDATE_PASSENGER,
    UPDATE_FLIGHT,
    MANAGE_PASSENGER
} from '../actions/types';

const initialState = {
    flights: [],
    passengers: [],
    managePassenger: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FLIGHTS:
            return { ...state, flights: action.payload };
        case FETCH_PASSENGERS:
            return { ...state, passengers: action.payload };
        case UPDATE_PASSENGER:
            return state;
        case UPDATE_FLIGHT:
            return state;
        case MANAGE_PASSENGER:
            return { ...state, managePassenger: action.payload };
        default:
            return state;
    }
}