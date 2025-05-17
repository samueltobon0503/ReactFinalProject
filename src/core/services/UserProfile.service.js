import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getUserProfile = () => {
    const token = getHeaders();
    return axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  };