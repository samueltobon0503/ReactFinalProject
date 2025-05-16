import axios from 'axios';
import { getHeaders } from '../../shared/getHeaders';

const BASE_URL = process.env.REACT_APP_URL_BASE;

export const getPlay = () => {
    const token = getHeaders();
    return axios.get(`${BASE_URL}/albums/6i6folBtxKV28WX3msQ4FE`, {
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
      }
    });
  };