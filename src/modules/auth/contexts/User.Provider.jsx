import { useReducer } from "react"
import { UserContext } from "./User.Context"
import { authReducer } from "../reducers/authReducer";
import { useAuthenticate } from "../hooks/useAunthenticate";

const authInitialize = {
    logged: false,
    user: null,
    errorMessage: null
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user){
        return{
            logged: true,
            errorMessage: null,
            user
        }
    }

    return authInitialize
}

export const UserProvider = ({children}) => {

    const [ userState, dispatch ] = useReducer(authReducer, authInitialize, init);
    const { login, logout, loginGoogle } = useAuthenticate(dispatch);


    return(
        <UserContext.Provider value={ {userState, login, logout, loginGoogle} }>
        { children }
        </UserContext.Provider>
    );
}