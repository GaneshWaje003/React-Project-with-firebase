import React, { useEffect } from 'react';
import '../css/listallmovies.css';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListAllMovie() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const openMovie = (metadata, url) => {
        const customMetadata = metadata.customMetadata;
        toast("open mvoie!");
        navigate('/movieInfo', { state: { customMetadata, url } })
    }


    return (
        <div className='listallmovies-main'>


            <div className="header-listall">
                <h1>{state.name} Movies</h1>

                <div className="back-to-home"></div>

            </div>

            {state &&
                (

                    <div className="all-movies-container">

                        <div className="movies-list-continer">

                            {state && state.sendState.map((imgdata, index) => (

                                <div key={index} className="api-movie-container-listmovie">
                                    <img className='img-movie-listall' onClick={() => openMovie(imgdata.metadata, imgdata.url)} src={imgdata.url} alt="" />
                                    <p>{imgdata.name}</p>
                                </div>

                            ))}

                        </div>


                    </div>

                )


            }


        </div>
    );
}
