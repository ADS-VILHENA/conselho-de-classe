import axios from 'axios';

const api = axios.create({
    baseURL:'https://coselhodeclasse-api.herokuapp.com/'
});

export default api ;