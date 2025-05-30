import { doc, collection, setDoc, query, getDocs, collectionGroup } from "firebase/firestore/lite"
import { FirebaseDB } from "../../../firebase/config"
import { playlistTypes } from "../types/playlistTypes";
import { data } from "react-router";

const userStr = localStorage.getItem('user');
const userL = JSON.parse(userStr);

export const usePlaylist = (user, dispatch) => {

    const getPlaylists = async () => {
        const playlistsGroup = collectionGroup(FirebaseDB, 'playlists')
        const q = query(playlistsGroup)
        const querySnapshot = await getDocs(q)
        const result = querySnapshot.docs.map(doc => {

            const userEmail = doc.ref.parent.parent?.id || 'unknown'
            return {
                id: doc.id,
                user: userEmail,
                ...doc.data()
            }
        })
        return result;
    }

    const savePlaylist = async (playlist) => {
        try {
            const newDoc = doc(collection(FirebaseDB,
                `Playlists/${userL.email}/playlists`));
            console.log(newDoc, userL.email);

            await setDoc(newDoc, playlist)

            console.log("Lo que se guardo", newDoc)

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