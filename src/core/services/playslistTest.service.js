import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';
import { getUserId } from '../../shared/getUserId';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getUserPlaylists = () => {
    const token = getHeaders();
    const userId = getUserId();
    return axios.get(`${BASE_URL}/users/${userId}/playlists`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  };