import { playlistTypes } from "../types/playlistTypes";

export const playListReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case playlistTypes.savePlaylist:
      return {
        ...state,
        playlists: [...state.playlists, action.payload]
      };

    case playlistTypes.updatePlaylist:
      return {
        ...state,
        playlists: state.playlists.map( playlist => {
          if (playlist.id === action.payload.id) {
            return { ...action.payload }
          }
          return playlist;
        })
      };

      case playlistTypes.error:
        return{
          ...state,
          errorMessage: action.payload.errorMessage
        }


    default:
      break;
  }
}