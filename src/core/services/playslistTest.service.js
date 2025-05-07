import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getPlay = () => {
    const token = getHeaders();
    console.log('Token en getPlay:', token);
    console.log('URL:', `${BASE_URL}/artists/4Z8W4fKeB5YxbusRsdQVPb`);
    return axios.get(`${BASE_URL}/artists/4Z8W4fKeB5YxbusRsdQVPb`, {
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
      }
    });
  };