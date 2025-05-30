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
  const [allUserPlaylists, setAllUserPlaylists] = useState([]);

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
        console.log("hola", response.data)
        setPlaylists(response.data);
        const firstItem = response.data.items?.[0];
        if (firstItem) {
          console.log("Guardando", firstItem)
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
      setAllUserPlaylists(savedPlaylists);
      console.log("Playlists guardadas en Firestore:", savedPlaylists);
      
    } catch (error) {
      console.error("Error al obtener playlists guardadas:", error);
    }
  };

  return (
    <div
      className="dashboard-content custom-scrollbar"
      style={{ height: "95vh", overflow: "auto" }}
    >
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
                
                {playlists?.items?.map((playListMost) => (
                  <div
                    key={playListMost.id}
                    className="card bg-dark text-white justify-content-center"
                    style={{
                      width: "280px",
                      minWidth: "180px",
                      margin: "10px",
                    }}
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
                      <br />
                      

                      <Link
                          to={`/Detail/${playListMost.id}`}
                          className="btn btn-success btn-sm"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Detalles
                        </Link>
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
              <div className="d-flex gap-3 overflow-auto mb-5 custom-scrollbar">
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
            <h3 className="mb-4" style={{ color: "#1DB954" }}>
              Creemos que te puede gustar
            </h3>
            <div className="d-flex flex-wrap gap-4">
              {allUserPlaylists.map((playlist) => {
                const imageUrl = playlist.images?.[0]?.url || '/fallback.jpg';
                return (
                  <div
                    key={playlist.id}
                    className="card bg-dark text-white"
                    style={{ width: "274px", minWidth: "180px" }}
                  >
                    <img
                      src={imageUrl}
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
                        <p className="card-text">
                          {playlist.description || "Sin descripción"}
                        </p>
                        <small className="d-block mb-3">
                          Seguidores: {playlist.tracks?.total ?? "—"}
                        </small>
                      </div>
                      <ToggleButton
                        className={
                          checkedStates[playlist.id] ? "toggle-on" : "toggle-off"
                        }
                        onLabel="Fav"
                        offLabel="Fav"
                        onIcon="pi pi-heart-fill"
                        offIcon="pi pi-heart"
                        checked={!!checkedStates[playlist.id]}
                        onChange={(e) => {
                          const isFav = e.value;
                          setCheckedStates((prev) => ({
                            ...prev,
                            [playlist.id]: isFav,
                          }));
                          if (isFav) {
                            savePlaylist(playlist);
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
