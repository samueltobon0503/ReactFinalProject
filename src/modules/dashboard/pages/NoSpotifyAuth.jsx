import React from 'react'


export const NoSpotifyAuth = () => {
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
                        <label className='text-center w-100 text-white' style={{marginTop:'20px'}}> No has iniciado sesion</label>
                        <p className='text-center w-100 ' style={{ textDecoration:'underline', colore:'white', cursor:'pointer'}} onMouseEnter={(e) => (e.target.style.color ='#B3B3B3')} onMouseLeave={(e) => (e.target.style.color ='#1DB954')}> Inicia sesion aqui</p>
                    </div>
                </div>
            </div>
        </>
    );
}


