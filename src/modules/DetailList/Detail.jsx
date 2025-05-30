import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylistById} from "../../../src/core/services/playslistTest.service";
import axios from "axios";


export const DetailList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await getPlaylistById(id);
        setPlaylist(response.data);
        console.log("Datos de la playlist:", response.data);

      } catch (err) {
        console.error("Error cargando playlist:", err);
        setError("No se pudo cargar la playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (loading) return <p className="text-white p-5">Cargando detalles...</p>;
  if (error || !playlist) return <p className="text-white p-5">{error}</p>;
  
  return (
    <div className="container py-5 text-white">
      <button
        onClick={() => navigate("/Dashboard")}
        className="btn btn-outline-light mb-4"
      >
        ← Volver al inicio
      </button>

      <h2 className="mb-4">{playlist.name}</h2>
      <img
        src={playlist.images?.[0]?.url}
        alt={playlist.name}
        className="img-fluid mb-4 rounded"
      />
      <p className="mb-4">{playlist.description || "Sin descripción"}</p>

      <h5>Canciones incluidas:</h5>
      <ul>
        {playlist.tracks?.items?.map((item, index) => (
          <li key={index}>{item.track.name}</li>
        ))}
      </ul>
    </div>
  );
};
