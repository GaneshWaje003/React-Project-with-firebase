import React, { useState } from 'react'
import '../css/movieInfo.css'
import Navbar from '../comp/Navbar'
import {useLocation , useNavigation} from 'react-router-dom'

export default function MovieInfo() {
  
    const { state } = useLocation();
    const {url,customMetadata} = state;
    const [expand,setExapand] = useState({});

    // const navigate = useNavigation();

    const expandMovieInfo = ()=>{

    }

    const downloadMovie = ()=>{
        window.location.href = 'https://hubcdn.cc/dl/?link=https://video-downloads.googleusercontent.com/ADGPM2kRiXotRQNXFXPRLCnZVp0Awo4fuGXdISohqEVPIIZtQI6oVssojFEB2FOtLLdylOMHXeDP-4jNYgV41O653SQdgg_oT2HSSUb4iqWSO2OWuJNhMuS0SePP-bijBYK07XBmJrxYQOU2hPhOmHB_FV0ZTNtfY5KFP8fbYzoW5rB3-FqsqyNcTpnJszFb4vJsNXfUR6Uuzr50KuShtlZwntYHE1FVrDh4130XYsza6Cwq4A72rec';
    }

    return (
    <div className='movie-info-main'>

        <div className="navbar-container-movie-info">
                <Navbar/>
        </div>


        <div className="movie-info-container">

        <div className="movie-info">

            <div className="movie-profile-trailer-container">
            
            <div className="movie-profile">
                 <img src={url} alt="" />
            </div>
            
            <div className="trailer-container">
                <iframe width="560" height="315" src={customMetadata.mlink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>    
            </div>

            </div>

            <div className="movie-name">
                <h1>Name : {customMetadata.mname}</h1>
            </div>

            <div className="movie-information">
                Info<h3>{customMetadata.minfo}</h3>
            </div>
            <p onClick={()=>expandMovieInfo()}>read more</p>

            <div className="movie-rating">
            <h1>Imdb rating :   {customMetadata.mrating}</h1>
            </div>
        </div>




        <div className="download-movie">
            <button onClick={()=>downloadMovie()}>download</button>
        </div>

        </div>


    </div>
  )
}
