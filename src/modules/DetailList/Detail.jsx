import { useParams } from "react-router-dom";
const mockPlaylists = {
  "chill-vibes": {
    title: "Chill Vibes",
    description: "Relájate con esta selección de canciones suaves.",
    image: "https://picsum.photos/id/1011/600/300",
    songs: ["Lofi Beat", "Chillstep", "Soft Guitar", "Ambient Relax"],
  },
  "workout-hits": {
    title: "Workout Hits",
    description: "Energía total para tus rutinas de ejercicio.",
    image: "https://picsum.photos/id/102/600/300",
    songs: ["Push It", "Run Fast", "Sweat Mode", "Beast Mode"],
  },
  "roadtrip-tunes": {
    title: "Roadtrip Tunes",
    description: "Canciones ideales para viajar y disfrutar del camino.",
    image: "https://picsum.photos/id/103/600/300",
    songs: ["Highway Drive", "Freedom", "Wanderlust", "Rolling Wheels"],
  },
};
export const DetailList = () => {
  const { id } = useParams();
  const playlist = mockPlaylists[id];

  if (!playlist) {
    return <h2 className="text-white p-5">Playlist no encontrada</h2>;
  }

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">{playlist.title}</h2>
      <img
        src={playlist.image}
        alt={playlist.title}
        className="img-fluid mb-4 rounded"
      />
      <p className="mb-4">{playlist.description}</p>
      <h5>Canciones incluidas:</h5>
      <ul>
        {playlist.songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};
