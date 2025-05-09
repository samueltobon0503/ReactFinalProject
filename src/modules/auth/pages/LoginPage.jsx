import { useContext, useState } from "react"
import { UserContext } from "../contexts/User.Context";
import { useNavigate } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { Button } from 'primereact/button';

const initialForm = {
  email: "",
  password: ""
}

export const Loginpage = () => {
  const { userState: { errorMessage }, login, loginGoogle } = useContext(UserContext);
  const navigate = useNavigate();

  const { email, password, onInputChange } = useForm(initialForm);

  const [error, setError] = useState(false);

  const onLoginUser = async (_target) => {
    const isLogged = await login({ email, password });

    console.log("Is loggged", isLogged);

    if (!isLogged) {
      setError(true);
    } else {
      navigate('/Dashboard', { replace: true });
    }
  };

  const onLoginGoogleUser = async (_target) => {
    const isLogged = await loginGoogle();

    if (!isLogged) {
      setError(true);
    } else {
      navigate('/Dashboard', { replace: true });
    }
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="container d-flex justify-content-center align-items-center bg-black" style={{ width: '500px', height: '500px' , borderRadius:'15px'}}>
          <div className="row w-100">
            <div className="mx-auto">
              <div className="card-body">
                <div className="form-group d-flex justify-content-center">
                  <img
                    alt="logo"
                    src="/assets/logo.png"
                    height="40"
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
                    style={{backgroundColor: '#B3B3B3' }}
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
                    style={{backgroundColor: '#B3B3B3' }}
                  />
                </div>
                <br />

                <div className="form-group d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg btn-block "
                    onClick={onLoginUser}
                    style={{
                      backgroundColor:'black',
                      border:'2px solid #1DB954'
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <br />

                <div className="form-group d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg btn-block "
                    onClick={onLoginGoogleUser}
                    style={{
                      backgroundColor:'black',
                      borderColor:'white'
                    }}
                  >
                    <img
                      src="assets/icons8-google.svg"
                      style={{
                        height:'20px',
                        weight:'20px',
                        marginRight:'10px'
                      }}
                    />
                    Continuar con Google
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert"
                  style={{
                    top:'100%',
                    width: '100%',
                    marginTop: '20px',
                    marginBottom:'0'
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


