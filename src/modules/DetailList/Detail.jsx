import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylistById} from "../../../src/core/services/playslistTest.service";
import axios from "axios";
import "./Detail.css";

export const DetailList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const calcularDuracionTotal = (items) => {
    const totalMs = items?.reduce((acc, item) => acc + (item.track?.duration_ms || 0), 0);
    const minutos = Math.floor(totalMs / 60000);
    const segundos = Math.floor((totalMs % 60000) / 1000);
    return `${minutos}m ${segundos}s`;
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await getPlaylistById(id);
        console.log("Respuesta completa de la playlist:", response);
        setPlaylist(response);
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
    <div className="container py-5 text-white custom-scrollbar" style={{ height: "95vh", overflow: "auto" }}>
      <button
        onClick={() => navigate("/Dashboard")}
        className="btn btn-outline-light mb-4"
      >
        ← Volver al inicio
      </button>

      <div className="d-flex align-items-center mb-4">
        <img
          src={playlist.images?.[0]?.url}
          alt={playlist.name}
          className="img-fluid rounded me-3"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <div>
          <h2>{playlist.name}</h2>
          <p>{playlist.description || "Sin descripción"}</p>
          <p><strong>Creada por:</strong> {playlist.owner?.display_name}</p>
          <p><strong>Seguidores:</strong> {playlist.followers?.total}</p>
          <p><strong>Total de canciones:</strong> {playlist.tracks?.total}</p>
          <p><strong>Duración total:</strong> {calcularDuracionTotal(playlist.tracks?.items)}</p>
          <p><strong>Visibilidad:</strong> {playlist.public ? "Pública" : "Privada"}</p>
          <a
            href={playlist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2"
          >
            Ver en Spotify
          </a>
        </div>
      </div>

      <h5 className="mt-4">Canciones incluidas:</h5>
      <ul>
        {playlist.tracks?.items?.map((item, index) => (
          <li key={index}>
            {item.track?.name} – <em>{item.track?.artists?.map(a => a.name).join(", ")}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};
