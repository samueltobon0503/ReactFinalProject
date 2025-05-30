import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/User.Context";
import { useNavigate } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { Link } from 'react-router-dom';
import { redirectToSpotifyLogin } from "../../../core/services/authorization.service";

const initialForm = {
  email: "",
  password: ""
}

export const Loginpage = () => {

  const { userState: { errorMessage }, login, loginGoogle, SpotifyLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { email, password, onInputChange } = useForm(initialForm);
  const [error, setError] = useState(false);

  const onLoginUser = async (_target) => {
    const isLogged = await login({ email, password });

    // console.log("Is loggged", isLogged);

    if (!isLogged) {
      setError(true);
    } else {
      navigate('/Dashboard', { replace: true });
    }
  };

  const onRegisterUser = async (_target) => {
    const isLogged = await login({ email, password });

    // console.log("Is loggged", isLogged);

    navigate('/Register', { replace: true });
  };

  const onLoginGoogleUser = async (_target) => {
    const isLogged = await loginGoogle();

    if (!isLogged) {
      setError(true);
    } else {
      navigate('/Dashboard', { replace: true });
    }
  }

  const onSpotifyLogin = () => {
    redirectToSpotifyLogin();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;

    // Siempre intenta loguear con el nuevo code
    SpotifyLogin(code)
      .then(isLogged => {
        if (isLogged) {
          navigate('/Dashboard', { replace: true });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="container d-flex justify-content-center align-items-center bg-black" style={{ width: '600px', height: '600px', borderRadius: '15px' }}>
          <div className="row w-100">
            <div className="mx-auto">
              <div className="card-body">
                <div className="form-group d-flex justify-content-center"
                  style={{
                    marginBottom: '15px',
                  }}>
                  <img
                    alt="logo"
                    src="/assets/logo.png"
                    height="=auto"
                    width="400px"
                    className="mr-2"
                  />
                </div>
                <div className="form-group ">
                  <label className="text-white"> Email </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    placeholder="Email"
                    style={{ backgroundColor: '#B3B3B3' }}
                  />
                </div>
                <div className="form-group">
                  <label className="text-white"> Contraseña </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    style={{ backgroundColor: '#B3B3B3' }}
                  />
                </div>
                <div style={{
                  marginTop: '10px'
                }}>
                  <Link
                    to="../../register/pages/Register.jsx"
                    className='text-center w-100 link-#1DB954'
                    style={{
                      textDecoration: 'underline',
                      color: '#1DB954',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#B3B3B3')}
                    onMouseLeave={(e) => (e.target.style.color = '#1DB954')}
                    onClick={onRegisterUser}
                  > Crea tu cuenta aqui</Link>
                </div>
                <br />

                <div className="form-group d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg btn-block "
                    onClick={onLoginUser}
                    style={{
                      backgroundColor: 'black',
                      border: '2px solid #1DB954'
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <br />

                <div className="form-group d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary btn-lg btn-block "
                    onClick={onLoginGoogleUser}
                    style={{
                      backgroundColor: 'black',
                      borderColor: 'white'
                    }}
                  >
                    <img
                      src="assets/icons8-google.svg"
                      height='30px'
                      weight='30px'
                      alt="google"
                      style={{ marginBottom: '5px', marginRight: '5px' }}
                    />
                    Continuar con Google
                  </button>
                </div>
                <br />

                <div className="form-group d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-primary btn-lg btn-block "
                    onClick={onSpotifyLogin}
                    style={{
                      backgroundColor: 'black',
                      border: '2px solid #1DB954'
                    }}
                  >
                    <img
                      src="assets/spotify-icon.svg"
                      height='30px'
                      weight='30px'
                      alt="spotify"
                      style={{ marginBottom: '5px', marginRight: '5px' }}
                    />
                    Continuar con Spotify
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert"
                    top='100%'
                    width='100%'
                    marginTop='30px'
                    marginBottom='0'
                    style={{
                      marginTop: '20px'
                    }}
                  >
                    {errorMessage}

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


