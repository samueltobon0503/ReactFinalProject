import { useContext, useEffect, useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getUserPlaylists } from "../../../core/services/playslistTest.service";
import { PlaylistContext } from "../../playlists/contexts/PlaylistContext";


export const DashboardPage = () => {
  const [checkedStates, setCheckedStates] = useState({});
  const { savePlaylist, getPlaylists } = useContext(PlaylistContext);

  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user.provider || user.provider !== 'spotify') {
      navigate('/No-spotify-auth', { replace: true });
    }

    getUserPlaylists()
      .then(response => {
        setPlaylists(response.data);
        const firstItem = response.data.items?.[0];
        if (firstItem) {
          console.log("Guardando", firstItem)
          savePlaylist(firstItem);
        } else {
          console.warn("No hay items en las playlists");
        }
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });
        // mostrarPlaylistsGuardadas();
  }, []);

const mostrarPlaylistsGuardadas = async () => {
  try {
    const savedPlaylists = await getPlaylists();
    console.log("Playlists guardadas en Firestore:", savedPlaylists);
  } catch (error) {
    console.error("Error al obtener playlists guardadas:", error);
  }
};

  return (
    <div className="dashboard-content">
      <div style={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
        <div
          className="Sidebar"
          style={{
            width: "270px",
            backgroundColor: "#212121",
            padding: "1rem",
            overflowY: "auto",
          }}
        >
          <h5 style={{ color: "#1DB954" }}>¡Bienvenido a tu espacio!</h5>
          <hr style={{ borderColor: "gray" }} />

          <h6 style={{ color: "white" }}>Tus Playlists</h6>

          <hr style={{ borderColor: "gray" }} />

          <div
            className="row g-4 mb-5"
            style={{ display: "flex", overflowX: "auto" }}
          >
            {[
              {
                id: "chill-vibes",
                name: "Chill Vibes",
                img: "https://picsum.photos/140",
              },
              {
                id: "workout-hits",
                name: "Workout Hits",
                img: "https://picsum.photos/140",
              },
              {
                id: "roadtrip-tunes",
                name: "Roadtrip Tunes",
                img: "https://picsum.photos/140",
              },
            ].map((playlist) => (
              <div className="col-auto" key={playlist.id}>
                <div
                  className="card bg-dark border-0 text-white"
                  style={{ width: "130px" }}
                >
                  <img
                    src={playlist.img}
                    className="card-img-top"
                    alt={playlist.name}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                  <div className="card-body" style={{ padding: "0.5rem" }}>
                    <h6 className="card-title" style={{ fontSize: "0.9rem" }}>
                      {playlist.name}
                    </h6>
                    <Link
                      to={`/Detail/${playlist.id}`}
                      className="btn btn-success btn-sm"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="Board-Principal" style={{ flex: 1, padding: "2rem" }}>
          <h1 style={{ color: "#1DB954" }}>Contenido Principal</h1>

          <h3 className="mb-4" style={{ color: "white" }}>
            Las Playlist Del Momento
          </h3>
          <div
            style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
            className="mb-5"
          >
            {playlists?.items?.map((playListMost) => (
              <div
                key={playListMost.id}
                className="card bg-dark text-white"
                style={{ width: "280px", minWidth: "180px" }}
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
          <div className="d-flex flex-column gap-4 mb-5">
            <h3 className="mb-4" style={{ color: "#1DB954" }}>
              Creemos que te puede gustar
            </h3>
            <div className="d-flex flex-wrap gap-4">
              {[
                {
                  name: "Mood Booster",
                  description: "Canciones alegres para levantar el ánimo",
                  followers: "1.2M",
                  img: "https://img.freepik.com/foto-gratis/viajero-vista-trasera-disfrutando-bonita-vista_23-2149121501.jpg?ga=GA1.1.1799899732.1746798904&semt=ais_hybrid&w=740",
                },
                {
                  name: "Lo Mejor del 2024",
                  description: "Hits que marcaron el año",
                  followers: "980K",
                  img: "https://img.freepik.com/fotos-premium/carretera-asfalto-texto-2024-al-horizonte-sol-horizonte-camino-adelante-avanzando-concepto-nuevo-ano-perspectivas-claras-positivas-delante-manana-temprana-otono_334782-7970.jpg?ga=GA1.1.1799899732.1746798904&semt=ais_hybrid&w=740",
                },
                {
                  name: "Café y Chill",
                  description: "Lo-fi y jazz para relajarte",
                  followers: "760K",
                  img: "https://img.freepik.com/foto-gratis/mujer-pelo-oscuro-relajado-vistiendo-camiseta-blanca-estilo-casual-posando-al-aire-libre-taza-te-o-cafe-caliente_176532-14579.jpg?ga=GA1.1.1799899732.1746798904&semt=ais_hybrid&w=740",
                },
              ].map((playlist, idx) => (
                <div
                  className="card bg-dark text-white"
                  style={{ width: "274px", minWidth: "180px" }}
                >
                  <img
                    src={playlist.img}
                    className="card-img-top"
                    alt={playlist.name}
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div
                    className="card-body d-flex flex-column justify-content-between p-4"
                    style={{ height: "280px" }}
                  >
                    <div>
                      <h6 className="card-title">{playlist.name}</h6>
                      <p className="card-text">{playlist.description}</p>
                      <small className="d-block mb-3">
                        Seguidores: {playlist.followers}
                      </small>
                    </div>
                    <ToggleButton
                      className={
                        checkedStates[playlist.name]
                          ? "toggle-on"
                          : "toggle-off"
                      }
                      onLabel="Fav"
                      offLabel="Fav"
                      onIcon="pi pi-heart-fill"
                      offIcon="pi pi-heart"
                      checked={checkedStates[playlist.name] || false}
                      onChange={(e) =>
                        setCheckedStates((prev) => ({
                          ...prev,
                          [playlist.name]: e.value,
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
