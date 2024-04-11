import React from 'react';
import '../css/listallmovies.css';
import { useLocation, useNavigation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListAllMovie() {
    const { state } = useLocation();
    const navigate = useNavigation();

    console.log(state, "it is state");

    const openMovie = (metadata, url) => {
        const customMetadata = metadata.customMetadata;
        toast("open mvoie!");
        navigate('/movieInfo', { state: { customMetadata, url } })
    }

    return (
        <div className='listallmovies-main'>

            {state &&
                (

                    <div className="all-movies-container">

                        <div className="movies-list-continer">

                            {state.sendState.map((imgdata, index) => (

                                <div className="api-movie-container-listmovie">
                                    <img onClick={openMovie(imgdata.metadata, imgdata.url)} src={imgdata.url} alt="" />
                                    <p>{imgdata.name}</p>
                                </div>

                            ))}

                        </div>


                    </div>

                )


            }

            {!state.imgnames || !state.imgnames.length === 0 &&
                <p>data is not recegving</p>
            }

        </div>
    );
}
