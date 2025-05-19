import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SPOTIFY_ENCRYPT_KEY;

export function getHeaders() {
  const encryptedToken = localStorage.getItem('spotify_access_token');

  if (!encryptedToken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  } catch (err) {
    return null;
  }
}
