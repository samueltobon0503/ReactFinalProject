import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { FirebaseAuth } from "./config"

const GoogleProvider = new GoogleAuthProvider();

export const loginUser = async (email, password) => {
    try {
        
         const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
         console.log(result)

         const {uid, photoURL, displayName} = result.user;

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

export const loginWithGoogle = async () =>{

    GoogleProvider.setCustomParameters({ prompt: 'select_account'});

    try {
        
         const result = await signInWithPopup(FirebaseAuth, GoogleProvider)
         console.log("Usuario de google", result)

         const { uid, photoURL, displayName, email} = result.user;

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