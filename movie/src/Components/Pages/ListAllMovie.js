import React from 'react';
import '../css/listallmovies.css';
import { useLocation } from 'react-router-dom';

export default function ListAllMovie() {
  const { state } = useLocation();

  console.log(state,"it is state");

  return (
    <div className='listallmovies-main'>

        {state &&   
        (

            <div className="all-movies-container">

                <div className="movies-list-continer">

                    {state.sendState.map((imgdata,index)=>(

                        <div className="api-movie-container-listmovie">
                            <img src={imgdata.url} alt="" />
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
