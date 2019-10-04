import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import airlineReducer from './airlineReducer';
import { reducer as formReducer } from 'redux-form';
export default combineReducers({
    auth: authReducer,
    airline: airlineReducer,
    form: formReducer
});