import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_ACCOUNT;

export const getP = (userId) => {
    const token = getHeaders();

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    return axios.post(`${BASE_URL}/artists/4Z8W4fKeB5YxbusRsdQVPb`, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token.access_token}`
          },
      });
};