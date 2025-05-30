import { useContext, useReducer } from "react";
import { PlaylistContext } from "./PlaylistContext";
import { usePlaylist } from "../hooks/usePlaylist";
import { playListReducer } from "../reducers/playlistReducer";
import { UserContext } from "../../auth/contexts/User.Context";

const initialState = {
  playlists: [],
};

const init = () => {
  return {
    playlists: [],
    errorMessage: null
  }
}

export const PlaylistProvider = ({ children }) => {
  const [playListState, dispatch] = useReducer(playListReducer, initialState, init);

  const { userState: user } = useContext(UserContext);

  const { savePlaylist, getPlaylists } = usePlaylist(user, dispatch);

  return (
    <PlaylistContext.Provider value={{ playListState, savePlaylist, getPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};