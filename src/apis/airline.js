import axios from 'axios';

export default axios.create({
    baseURL: 'https://airline-server.herokuapp.com'
})