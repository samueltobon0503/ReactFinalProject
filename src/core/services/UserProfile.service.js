import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getUserProfile = () => {
    const token = getHeaders();
    console.log(token)
    return axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  };

export const getUserArtists = () => {
    const token = getHeaders();
    console.log(token)
    return axios.get(`${BASE_URL}/me/following?type=artist`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  };
