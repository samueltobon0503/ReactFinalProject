import { useContext, useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User.Context';

const initialForm = {
    email: "",
    password: ""
}

const Register = () => {

    const { userState: { errorMessage }, registerEmail } = useContext(UserContext);

    const { email, password, onInputChange } = useForm(initialForm);

    const [error, setError] = useState(false);

    const onRegisterUser = async (_target) => {
        const isRegister = await registerEmail({ email, password });
        // console.log("is Register", isRegister);

        if (!isRegister) {
            setError(true);
        } else {
            navigate('/Dashboard', { replace: true });
        }
    };

    const navigate = useNavigate();

    const returnLogin = async (_target) => {
        navigate('/', { replace: true });
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="container d-flex justify-content-center align-items-center bg-black" style={{ width: '600px', height: '800px', borderRadius: '15px' }}>
                    <div className='row w=100'>
                        <div className='mx-auto'>
                            <div className='card-body'>
                                <div className='form-group d-flex justify-content-center'>
                                    <img
                                        alt='logo'
                                        src="/assets/logo.png"
                                        height="auto"
                                        width='400px'
                                        className='mr-2'
                                    />
                                </div>
                                <br />
                                <div className='form-group'>
                                    <label className='text-white'> Nombre de Usuario </label>
                                    <input
                                        type='name'
                                        className='form-control'
                                        id='name'
                                        name='name'
                                        placeholder='Digite el nombre de usuario'
                                        style={{ backgroundColor: '#B3B3B3' }}
                                    />
                                </div>
                                <div>
                                    <label className='text-white'> Email </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        name='email'
                                        placeholder='Digite su email'
                                        style={{ backgroundColor: '#B3B3B3' }}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div>
                                    <label className='text-white'> Contraseña </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        name='password'
                                        placeholder='Digite su contraseña'
                                        style={{ backgroundColor: '#B3B3B3' }}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div>
                                    <label className='text-white'> Confirmar contraseña </label>
                                    <input
                                        type='Password'
                                        className='form-control'
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        placeholder='Confirmar su contraseña'
                                        style={{ backgroundColor: '#B3B3B3' }}
                                    />
                                </div>
                                <br />
                                <div>
                                    <Link
                                        to="../../auth/pages/LoginPage.jsx"
                                        className='text-center w-100 link-#1DB954'
                                        backgroundColor='#1DB954!important'
                                        style={{
                                            textDecoration: 'underline',
                                            color: '#1DB954',
                                            margin: '75px'
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = '#B3B3B3')}
                                        onMouseLeave={(e) => (e.target.style.color = '#1DB954')}
                                        onClick={returnLogin}
                                    > Ya tienes una cuenta?, Inicia sesión </Link>
                                </div>
                                <br />
                                <div className='form-group d-flex justify-content-center'>
                                    <button
                                        className='btn btn-primary btn-lg btn-block'
                                        style={{
                                            backgroundColor: 'black',
                                            border: '2px solid #1DB954'
                                        }}
                                        onClick={onRegisterUser}
                                    >
                                        Siguiente
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
    )
}

export default Register
