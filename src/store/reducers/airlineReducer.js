import {
    FETCH_FLIGHTS,
    FETCH_PASSENGERS
} from '../actions/types';

const initialState = {
    flights: [],
    passengers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FLIGHTS:
            return { ...state, flights: action.payload };
        case FETCH_PASSENGERS:
            return { ...state, passengers: action.payload };
        default:
            return state;
    }
}