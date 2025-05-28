import { useContext, useEffect, useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getUserPlaylists } from "../../../core/services/playslistTest.service";
import { PlaylistContext } from "../../playlists/contexts/PlaylistContext";
import "./Dashboard.css";

export const DashboardPage = () => {
  const [checkedStates, setCheckedStates] = useState({});
  const { savePlaylist, getPlaylists } = useContext(PlaylistContext);

  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.provider || user.provider !== "spotify") {
      navigate("/No-spotify-auth", { replace: true });
    }

    getUserPlaylists()
      .then((response) => {
        setPlaylists(response.data);
        const firstItem = response.data.items?.[0];
        if (firstItem) {
          savePlaylist(firstItem);
        } else {
          console.warn("No hay items en las playlists");
        }
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
        setError("Error al obtener las playlists");
      });
    mostrarPlaylistsGuardadas();
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
    <div className="dashboard-content custom-scrollbar" style={{ height: "95vh", overflow: "auto" }}>
      <div className="container-fluid ">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-2 mb-4 mb-md-0 custom-scrollbar">
            <div
              className="bg-dark text-white p-3 h-100"
              style={{ minHeight: "100vh" }}
            >
              <h5 className="text-success">¡Bienvenido a tu espacio!</h5>
              <hr className="border-secondary" />

              <h6>Tus Playlists</h6>
              <hr className="border-secondary" />

              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-1 g-3">
                {
                
                playlists?.items?.map((playlist) => (
                  <div className="col" key={playlist.id}>
                    <div className="card bg-dark border-0 text-white">
                      <img
                        src={playlist.img}
                        className="card-img-top"
                        alt={playlist.name}
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                      <div className="card-body p-2">
                        <h6
                          className="card-title"
                          style={{ fontSize: "0.9rem" }}
                        >
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
          </div>

          {/* Contenido principal */}
          <div className="col-12 col-md-9">
            <div className="p-3">
              <h1 className="text-success">Contenido Principal</h1>

              <h3 className="mb-4 text-white">Las Playlist Del Momento</h3>
              <div
                className="d-flex gap-3 overflow-auto mb-5 custom-scrollbar"
                 
              >
                {playlists?.items?.map((playListMost) => (
                  <div
                    key={playListMost.id}
                    className="card bg-dark text-white flex-shrink-0"
                    style={{ width: "250px" }}
                  >
                    <img
                      src={playListMost.images?.[0]?.url}
                      className="card-img-top"
                      alt={playListMost.nameList}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body p-3">
                      <h6 className="card-title">{playListMost.name}</h6>
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

              <h3 className="mb-4 text-success">Creemos que te puede gustar</h3>
              <div
                className="d-flex gap-3 overflow-auto mb-5 custom-scrollbar"
                style={{ paddingBottom: "0.7rem" }}
              >
                {[
                  {
                    name: "Mood Booster",
                    description: "Canciones alegres para levantar el ánimo",
                    followers: "1.2M",
                    img: "https://img.freepik.com/foto-gratis/viajero-vista-trasera-disfrutando-bonita-vista_23-2149121501.jpg",
                  },
                  {
                    name: "Lo Mejor del 2024",
                    description: "Hits que marcaron el año",
                    followers: "980K",
                    img: "https://img.freepik.com/fotos-premium/carretera-asfalto-texto-2024-al-horizonte.jpg",
                  },
                  {
                    name: "Café y Chill",
                    description: "Lo-fi y jazz para relajarte",
                    followers: "760K",
                    img: "https://img.freepik.com/foto-gratis/mujer-pelo-oscuro-relajado.jpg",
                  },
                ].map((playlist, idx) => (
                  <div
                    key={idx}
                    className="card bg-dark text-white flex-shrink-0"
                    style={{ width: "250px" }}
                  >
                    <img
                      src={playlist.img}
                      className="card-img-top"
                      alt={playlist.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between p-3">
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
    </div>
  );
};
