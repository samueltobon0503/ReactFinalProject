import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_ACCOUNT;

export const getToken = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);

    return axios.post(`${BASE_URL}/token`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
};

export const getP = () => {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    return axios.post(`${BASE_URL}/token`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
};