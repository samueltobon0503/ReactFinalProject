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

export const getPlaylistById = async (playlistId) => {
  const token = getHeaders();
  console.log(token);

  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
