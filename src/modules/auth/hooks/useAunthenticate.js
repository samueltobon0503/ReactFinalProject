import { getSpotifyToken, redirectToSpotifyLogin } from "../../../core/services/authorization.service";
import { getUserProfile } from "../../../core/services/UserProfile.service";
import { loginUser, loginWithGoogle, registerWithEmail, } from "../../../firebase/provider";
import { authTypes } from "../types/authTypes";
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router";

const SECRET_KEY = process.env.REACT_APP_SPOTIFY_ENCRYPT_KEY;

export const useAuthenticate = (dispatch) => {

    const navigate = useNavigate();

    const login = async ({ email, password }) => {

        const { ok, uid, photoUrl, displayName, errorMessage } = await loginUser(email, password);

        if (!ok) {
            const action = {
                type: authTypes.errors,
                payload: { errorMessage },
            };
            dispatch(action);
            return false;
        }

        const userPayload = { email, uid, displayName, photoUrl }

        const action = {
            type: authTypes.login,
            payload: userPayload
        }

        localStorage.setItem('user', JSON.stringify(userPayload));
        dispatch(action)

        return true;
    };

    const loginGoogle = async () => {
        const { ok, uid, photoUrl, displayName, errorMessage, email } = await loginWithGoogle();

        if (!ok) {
            const action = {
                type: authTypes.errors,
                payload: { errorMessage },
            };
            dispatch(action);
            return false;
        }

        const userPayload = { email, uid, displayName, photoUrl }

        const action = {
            type: authTypes.login,
            payload: userPayload
        }

        localStorage.setItem('user', JSON.stringify(userPayload));
        dispatch(action)

        return true;
    }

    const logout = () => {

        localStorage.clear();
        navigate('/Login', { replace: true });

        const action = {
            type: authTypes.logout,
        };

        dispatch(action);
    };

    const registerEmail = async ({ email, password }) => {
        const { ok, errorMessage } = await registerWithEmail(email, password);

        if (!ok) {
            const action = {
                type: authTypes.errors,
                payload: { errorMessage }
            };
            dispatch(action)
            return false
        }

        const userPayload = { email }

        const action = {
            type: authTypes.register,
            payload: userPayload
        }

        localStorage.setItem('user', JSON.stringify(userPayload))
        dispatch(action)
    }

    const SpotifyLogin = async (code) => {
        try {
            const { access_token } = await getSpotifyToken(code);

            const encryptedToken = CryptoJS.AES
                .encrypt(JSON.stringify(access_token), SECRET_KEY)
                .toString();
            localStorage.setItem('spotify_access_token', encryptedToken);

            const { data } = await getUserProfile();

            // console.log(data)

            if (!data.email) {
                throw new Error('No se pudo obtener el perfil del usuario');
            }

            const userPayload = {
                email: data.email,
                displayName: data.display_name || data.id,
                id: data.id,
                photoUrl: data.images?.[0]?.url || null,
                provider: 'spotify'
            };

            localStorage.setItem('user', JSON.stringify(userPayload));

            dispatch({ type: authTypes.login, payload: userPayload });

            return true;
        } catch (error) {
            console.error('Error Spotify login:', error);

            dispatch({
                type: authTypes.errors,
                payload: { errorMessage: 'Error autenticando con Spotify' }
            });

            return false;
        }
    };

    return { login, loginGoogle, logout, registerEmail, SpotifyLogin };
}

