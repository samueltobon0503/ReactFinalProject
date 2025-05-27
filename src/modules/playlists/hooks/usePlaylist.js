import { doc, collection, setDoc, query, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../../firebase/config"
import { playlistTypes } from "../types/playlistTypes";
import { data } from "react-router";

const userStr = localStorage.getItem('user');
const userL = JSON.parse(userStr);

export const usePlaylist = (user, dispatch) => {

    const getPlaylists = async () => {
        const playlists = collection(FirebaseDB, `${userL.email}/Spotify-Consumer/playlists`)

        const q = query(playlists)
        const querySnapshot = await getDocs(q)
        const result = querySnapshot.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        })
        return result;
    }

    const savePlaylist = async (playlist) => {
        try {


            const newDoc = doc(collection(FirebaseDB, `${userL.email}/Spotify-Consumer/playlists`));
            console.log(newDoc, userL.email);

            await setDoc(newDoc, playlist)

            playlist.id = newDoc.id;

            const action = {
                type: playlistTypes.savePlaylist,
                payload: playlist
            }

            dispatch(action);
        } catch (error) {
            const action = {
                type: playlistTypes.error,
                payload: { errorMessage: error }
            }
            dispatch(action);
        }
    }

    return { savePlaylist, getPlaylists }
}