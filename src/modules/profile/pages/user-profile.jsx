import { useEffect, useState } from "react";
import { getUserArtists, getUserProfile, getUserTracks } from "../../../core/services/UserProfile.service";
import { useNavigate } from "react-router";
import { getUserPlaylists } from "../../../core/services/playslistTest.service";
import { ToggleButton } from "primereact/togglebutton";

export const UserProfile = () => {

  const [user, setUser] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [playlists, setPlaylists] = useState([])
  const [artists, setArtists] = useState([])
  const [tracks, SetTracks]= useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then(response => {
        setUser(response); 
      console.log(response)
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
      });

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user.provider || user.provider !== 'spotify') {
      navigate('/No-spotify-auth', { replace: true });
    }

    getUserPlaylists()
      .then(response => {
        setPlaylists(response.data); 
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });

    getUserArtists()
      .then(response => {
        setArtists(response.data); 
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });

      getUserTracks()
      .then(response => {
        console.log(response)
        SetTracks(response.data); 
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });
  }, []);

  return (
    <div className="container py-5 text-white custom-scrollbar " style={{ height: "95vh", overflow: "auto" }}>
      <div className="d-flex align-items-center gap-4 mb-5">
        <img
          src={user.data?.images?.[0]?.url || '/assets/user-default.png'}
          alt="Avatar Usuario"
          width="190"
          height="200"
        />
        <div>
          <h1 className="mb-1">{user.data?.display_name}</h1>
          <p className="mb-0">{user.data?.email}</p>
          <small>País: {user.data?.country} · Seguidores:  {user.data?.followers.total} </small>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Playlists</h5>
            <p className="display-6 mb-0">{playlists?.total}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Artistas seguidos</h5>
            <p className="display-6 mb-0">{artists?.artists?.total}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Canciones guardadas</h5>
            <p className="display-6 mb-0">{tracks?.total}</p>
          </div>
        </div>
      </div>

      <h3 className="mb-4">Tus Playlists</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5 d-flex" >

        {playlists?.items?.map((playListMost) => (
          <div
            key={playListMost.id}
            className="card bg-dark text-white justify-content-center"
            style={{ width: "280px", minWidth: "180px", margin: '10px' }}
          >
            <img
              src={playListMost.images?.[0]?.url}
              className="card-img-top"
              alt={playListMost.nameList}
              style={{ height: "280px", objectFit: "cover" }}
            />
            <div className="card-body p-5">
              <h6 className="card-title mb-3">{playListMost.name}</h6>
              <small>Seguidores: {playListMost.tracks?.total}</small>

            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4">Artistas Seguidos</h3>
      <table className="table table-dark table-striped">
        <thead style={{ textAlign:'center' }}>
          <tr>
            <th>#</th>
            <th>Artista</th>
            <th>Géneros</th>
            <th>Seguidores</th>
            <th>Popularidad</th>
          </tr>
        </thead>
        <tbody style={{ textAlign:'center' }}>
          {artists?.artists?.items?.map((artist, idx) => (
            <tr key={artist.id} >
              <td>{idx + 1}</td>
              <td>{artist.name}</td>
              <td>{artist.genres.length > 0 ? artist.genres.join(', ') : 'N/A'}</td>
              <td>{artist.followers.total.toLocaleString()}</td>
              <td>{artist.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
