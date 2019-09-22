import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import airlineReducer from './airlineReducer';
export default combineReducers({
    auth: authReducer,
    airline: airlineReducer
});