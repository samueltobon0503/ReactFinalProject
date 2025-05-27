import { useEffect, useState } from "react";
import { getUserArtists, getUserProfile } from "../../../core/services/UserProfile.service";
import { useNavigate } from "react-router";
import { getUserPlaylists } from "../../../core/services/playslistTest.service";
import { ToggleButton } from "primereact/togglebutton";

export const UserProfile = () => {

  const [user, setUser] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [playlists, setPlaylists] = useState([])
  const [artists, setArtists] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then(response => {
        setUser(response); // o `response.data.items`, según tu backend
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
        setPlaylists(response.data); // o `response.data.items`, según tu backend
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });

      getUserArtists()
      .then(response => {
        console.log(response)
        setArtists(response.data); // o `response.data.items`, según tu backend
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });
  }, []);

  return (
    <div className="container py-5 text-white">
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
          <small>País: {user.data?.country} · Cuenta: Premium · Seguidores:  {user.data?.followers.total} </small>
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
            <p className="display-6 mb-0">{}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Canciones guardadas</h5>
            <p className="display-6 mb-0">buscar{}</p>
          </div>
        </div>
      </div>

      <h3 className="mb-4">Tus Playlists</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5 d-flex" >

        {playlists?.items?.map((playListMost) => (
          <div
            key={playListMost.id}
            className="card bg-dark text-white justify-content-center"
            style={{ width: "280px", minWidth: "180px" , margin: '10px'}}
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
              <ToggleButton

                onLabel="Agregar"
                offLabel="Eliminar"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                checked={checkedStates[playListMost.id] || false}
                onChange={(e) =>
                  setCheckedStates((prev) => ({
                    ...prev,
                    [playListMost.id]: e.value,
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4">Reproducciones Recientes</h3>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Canción</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Reproducido</th>
          </tr>
        </thead>
        <tbody>
          {[
            { track: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', when: 'Hace 5 minutos' },
            { track: 'La Fama', artist: 'Rosalía ft. The Weeknd', album: 'Motomami', when: 'Hace 20 minutos' },
            { track: 'Tití Me Preguntó', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', when: 'Ayer' }
          ].map((play, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{play.track}</td>
              <td>{play.artist}</td>
              <td>{play.album}</td>
              <td>{play.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}