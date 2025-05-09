import { useEffect, useState } from "react";
import { getPlay } from "../../../core/services/playslistTest.service";
import { ToggleButton } from "primereact/togglebutton";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});

  useEffect(() => {
    getPlay()
      .then((response) => {
        console.log("Data:", response);
        setData(response);
      })
      .catch((error) => {
        console.error("Error data:", error);
        setError(error);
      });
  }, []);

  const playlists = Array.isArray(data)
    ? data
    : data?.playlists || data?.items || [];

  return (
    <div className="dashboard-content">
      <div style={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
        {/* Sidebar */}
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

        {/* Contenido principal */}
        <div className="Board-Principal" style={{ flex: 1, padding: "2rem" }}>
          <h1 style={{ color: "#1DB954" }}>Contenido Principal</h1>

          <h3 className="mb-4" style={{ color: "white" }}>
            Las Playlist Del Momento
          </h3>
          <div
            style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
            className="mb-5"
          >
            {[
              {
                nameList: "Clasicos de Rock",
                img: "https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                followers: "18,345",
              },
              {
                nameList: "Musica para planchar",
                img: "https://images.pexels.com/photos/31963420/pexels-photo-31963420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                followers: "15,876",
              },
              {
                nameList: "Para hacer el suculento",
                img: "https://images.pexels.com/photos/965879/pexels-photo-965879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                followers: "13,210",
              },
              {
                nameList: "Tracklist StarWars",
                img: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/12/star-wars-scaled.jpg?resize=1200%2C675&quality=70&strip=all&ssl=1",
                followers: "8,210",
              },
              {
                nameList: "SadList",
                img: "https://img.freepik.com/foto-gratis/vista-superior-papel-roto-corazon-rojo_23-2149415855.jpg?ga=GA1.1.1799899732.1746798904&semt=ais_hybrid&w=740",
                followers: "5,210",
              },
            ].map((playListMost, i) => (
              <div
                key={playListMost.nameList}
                className="card bg-dark text-white"
                style={{ width: "280px", minWidth: "180px" }}
              >
                <img
                  src={playListMost.img}
                  className="card-img-top"
                  alt={playListMost.nameList}
                  style={{ height: "280px", objectFit: "cover" }}
                />
                <div className="card-body p-5">
                  <h6 className="card-title mb-3">{playListMost.nameList}</h6>
                  <small>Seguidores: {playListMost.followers}</small>
                  <ToggleButton 
                  
                    onLabel="Agregar"
                    offLabel="Eliminar"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={checkedStates[playListMost.nameList] || false}
                    onChange={(e) =>
                      setCheckedStates((prev) => ({
                        ...prev,
                        [playListMost.nameList]: e.value,
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
