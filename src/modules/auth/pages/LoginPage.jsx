import { useContext, useState } from "react"
import { UserContext } from "../contexts/User.Context";
import { useNavigate } from "react-router";
import { useForm } from "../../../hooks/useForm";


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
      <div className="container vh-100 justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-3"></div>
          <div className="col-md-6 mx-auto">
            <div className="card-body">
              <h4 className="card-title text-center"> Login Page </h4>
              <div className="form-group">
                <label> Email </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="Enter user email"
                />
              </div>
              <div className="form-group">
                <label> Password </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Enter password"
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onLoginUser}
                >
                  Login
                </button>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onLoginGoogleUser}
                >
                  Login
                </button>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    </>
  );
}


