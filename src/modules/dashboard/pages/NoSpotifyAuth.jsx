import { useNavigate } from "react-router";

export const NoSpotifyAuth = () => {
    const navigate = useNavigate();
    const onRedirect = async (_target) => {
        navigate('/Login', { replace: true });
    };
    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="container d-flex justify-content-center align-items-center bg-black" style={{ width: '500px', height: '500px', borderRadius: '15px' }}>
                    <div className="card-body">
                        <div className="form-group d-flex justify-content-center">
                            <img
                                alt="logo"
                                src="/assets/logo.png"
                                height="60"
                                className="mr-2"
                            />
                        </div>
                        <label className='text-center w-100 text-white' style={{ marginTop: '20px' }}> No has iniciado sesion con Spotify</label>
                        <p className='text-center w-100 ' onClick={onRedirect}
                            style={{ textDecoration: 'underline', color: 'white', cursor: 'pointer' }}> Inicia sesion aqui</p>
                    </div>
                </div>
            </div>
        </>
    );
}


