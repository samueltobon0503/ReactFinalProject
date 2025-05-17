import { loginUser, loginWithGoogle, registerWithEmail ,} from "../../../firebase/provider";
import { authTypes } from "../types/authTypes";

export const useAuthenticate = (dispatch) => {

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
        const action = {
            type: authTypes.logout,
        };

        dispatch(action);
    };


        const registerEmail = async({email, password}) =>{
            const {ok,errorMessage} = await registerWithEmail(email, password);

            if(!ok){
                const action = {
                    type: authTypes.errors,
                    payload: {errorMessage}
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

        return { login, loginGoogle, logout, registerEmail};
}

