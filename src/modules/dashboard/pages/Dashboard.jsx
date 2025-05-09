import { useEffect, useState } from 'react';
import { getPlay } from '../../../core/services/playslistTest.service';
import { ToggleButton } from 'primereact/togglebutton';
export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [checkedStates, setCheckedStates] = useState({});



  useEffect(() => {
    getPlay()
      .then((response) => {
        console.log('Data:', response);
        setData(response);
      })
      .catch((error) => {
        console.error('Error data:', error);
        setError(error);
      });
  }, []);

  const playlists = Array.isArray(data) ? data : data?.playlists || data?.items || [];

  return (

    <div className="dashboard-content">
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div className="Sidebar" style={{ width: '270px', backgroundColor: '#212121', padding: '1rem', overflowY: 'auto' }}>
          <h5 style={{ color: '#1DB954' }}>¡Bienvenido a tu espacio!</h5>
          <hr style={{ borderColor: 'gray' }} />

          <h6 style={{ color: 'white' }}>Tus Playlists</h6>

          <hr style={{ borderColor: 'gray' }} />

          <div className="row g-4 mb-5" style={{ display: 'flex', overflowX: 'auto' }}>
            <div className="col-auto">
              <div className="card bg-dark border-0 text-white" style={{ width: '130px' }}>
                <img
                  src="https://picsum.photos/140"
                  className="card-img-top"
                  alt="Chill Vibes"
                  style={{ height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ padding: '0.5rem' }}>
                  <h6 className="card-title" style={{ fontSize: '0.9rem' }}>Chill Vibes</h6>
                  <a href="#" className="btn btn-success btn-sm" style={{ fontSize: '0.7rem' }}>Ver</a>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="card bg-dark border-0 text-white" style={{ width: '130px' }}>
                <img
                  src="https://picsum.photos/140"
                  className="card-img-top"
                  alt="Workout Hits"
                  style={{ height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ padding: '0.5rem' }}>
                  <h6 className="card-title" style={{ fontSize: '0.9rem' }}>Workout Hits</h6>
                  <a href="#" className="btn btn-success btn-sm" style={{ fontSize: '0.7rem' }}>Ver</a>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="card bg-dark border-0 text-white" style={{ width: '130px' }}>
                <img
                  src="https://picsum.photos/140"
                  className="card-img-top"
                  alt="Roadtrip Tunes"
                  style={{ height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ padding: '0.5rem' }}>
                  <h6 className="card-title" style={{ fontSize: '0.9rem' }}>Roadtrip Tunes</h6>
                  <a href="#" className="btn btn-success btn-sm" style={{ fontSize: '0.7rem' }}>Ver</a>
                </div>
              </div>
            </div>
          </div>


        </div>


        {/* Contenido principal */}
        <div className="Board-Principal" style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ color: '#1DB954' }}>Contenido Principal</h1>
          <p>Bienvenido al dashboard.</p>


          <h3 className="mb-4" style={{ color: 'white' }}>Las Playlist Del Momento</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }} className="mb-5">
            {[
              { nameList: 'Clasicos de Rock', img: 'https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers: '18,345' },
              { nameList: 'Musica para planchar', img: 'https://images.pexels.com/photos/31963420/pexels-photo-31963420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers: '15,876' },
              { nameList: 'Para hacer el suculento', img: 'https://images.pexels.com/photos/965879/pexels-photo-965879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers: '13,210' }
            ].map((playListMost, i) => (
              <div key={playListMost.nameList} className="card bg-dark text-white" style={{ width: '280px', minWidth: '180px' }}>
                <img src={playListMost.img} className="card-img-top" alt={playListMost.nameList} style={{ height: '280px', objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <h6 className="card-title mb-1">{playListMost.nameList}</h6>
                  <small>Seguidores: {playListMost.followers}</small>
                  <ToggleButton
                    onLabel="Agregar"
                    offLabel="Quitar"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times" 
                    checked={checkedStates[playListMost.nameList] || false}
                    onChange={(e) =>
                      setCheckedStates((prev) => ({
                        ...prev,
                        [playListMost.nameList]: e.value
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
  );
};
