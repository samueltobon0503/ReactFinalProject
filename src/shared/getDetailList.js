export function getPlaylistById() {
  const playlistStr = localStorage.getItem('Playlist');

  if (!playlistStr) return null;

  try {
    const playlist = JSON.parse(playlistStr);
    return playlist.id;
  } catch (err) {
    return null;
  }
}
