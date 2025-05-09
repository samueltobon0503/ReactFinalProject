import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getPlay = () => {
    const token = getHeaders();
    return axios.get(`${BASE_URL}/artists/4Z8W4fKeB5YxbusRsdQVPb`, {
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
      }
    });
  };