import axios from 'axios';
import { generateRandomString } from '../../shared/StringGenerator';


export const redirectToSpotifyLogin = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const scope = process.env.REACT_APP_SPOTIFY_SCOPE;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  const state = generateRandomString(16)
  localStorage.setItem('spotify_auth_state', state);

  console.log(redirectUri)


  const authUrl = process.env.REACT_APP_SPOTIFY_AUTH_URL +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    });

  console.log(authUrl)

  window.location.href = authUrl;
};



export const getSpotifyToken = async (code) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  const tokenUrl = process.env.REACT_APP_SPOTIFY_USER_URL;

  const headers = {
    'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  });

  try {
    const response = await axios.post(tokenUrl, body.toString(), { headers });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el token:', error.response?.data || error.message);
    throw error;
  }
};
