
export const UserProfile = () => {

  return (
    <div className="container py-5 text-white">
      <div className="d-flex align-items-center gap-4 mb-5">
        <img
          src="/assets/persona.jpg"
          alt="Avatar Usuario"
          width="190"
          height="200"
        />
        <div>
          <h1 className="mb-1">Juan Pérez</h1>
          <p className="mb-0">juan.perez@example.com</p>
          <small>País: ES · Cuenta: Premium · Seguidores: 1,234</small>
        </div>
      </div>
  
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Playlists</h5>
            <p className="display-6 mb-0">12</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Artistas seguidos</h5>
            <p className="display-6 mb-0">45</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-secondary text-center p-3">
            <h5>Canciones guardadas</h5>
            <p className="display-6 mb-0">320</p>
          </div>
        </div>
      </div>
  
      <h3 className="mb-4">Tus Playlists</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div className="col">
          <div className="card h-100 bg-dark border-0 text-white">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
              alt="Chill Vibes"
            />
            <div className="card-body">
              <h5 className="card-title">Chill Vibes</h5>
              <p className="card-text">35 canciones · 2,145 seguidores</p>
              <a href="#" className="btn btn-success btn-sm">Ver en Spotify</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 bg-dark border-0 text-white">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Workout Hits</h5>
              <p className="card-text">50 canciones · 5,678 seguidores</p>
              <a href="#" className="btn btn-success btn-sm">Ver en Spotify</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 bg-dark border-0 text-white">
            <img
              src="https://picsum.photos/200"
              className="card-img-top"
              alt="Roadtrip Tunes"
            />
            <div className="card-body">
              <h5 className="card-title">Roadtrip Tunes</h5>
              <p className="card-text">28 canciones · 1,022 seguidores</p>
              <a href="#" className="btn btn-success btn-sm">Ver en Spotify</a>
            </div>
          </div>
        </div>
      </div>
  
      <h3 className="mb-4">Tus Artistas Favoritos</h3>
      <ul className="list-group list-group-flush mb-5">
        {[
          { name: 'Rosalía', img: 'https://picsum.photos/200', followers: '12,345' },
          { name: 'Bad Bunny', img: 'https://picsum.photos/200', followers: '9,876' },
          { name: 'The Weeknd', img: 'https://picsum.photos/200', followers: '15,210' }
        ].map((artist, i) => (
          <li key={i} className="list-group-item bg-transparent d-flex align-items-center text-white">
            <img src={artist.img} alt={artist.name} className="rounded-circle me-3" width="50" height="50" />
            <span>{artist.name}</span>
            <span className="ms-auto">Seguidores: {artist.followers}</span>
          </li>
        ))}
      </ul>
  
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