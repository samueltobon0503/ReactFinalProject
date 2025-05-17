import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FirebaseAuth } from "./config"

const GoogleProvider = new GoogleAuthProvider();

export const loginUser = async (email, password) => {
    try {

        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        console.log(result)

        const { uid, photoURL, displayName } = result.user;

        return {
            ok: true,
            displayName, photoURL, email, uid
        }

    } catch (error) {
        console.log(`Error from firebase: ${error.message}`)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithGoogle = async () => {

    GoogleProvider.setCustomParameters({ prompt: 'select_account' });

    try {

        const result = await signInWithPopup(FirebaseAuth, GoogleProvider)
        console.log("Usuario de google", result)

        const { uid, photoURL, displayName, email } = result.user;

        return {
            ok: true,
            displayName,
            photoURL,
            email,
            uid
        }

    } catch (error) {
        console.log(`Error from firebase: ${error.message}`)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}  

export const registerWithEmail = async (email, password) =>{
    try {

        const userCredential = await createUserWithEmailAndPassword (FirebaseAuth,email, password)
        const user = userCredential.user;
        console.log('Esta registrado:',userCredential.user)

        const displayName = email.split('@')[0];

        await updateProfile(user, {displayName});

        return{
            ok:true,
            email,
            displayName,
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}