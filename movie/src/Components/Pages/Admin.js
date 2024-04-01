import React, { useState } from 'react'
import Navbar from '../comp/Navbar'
import '../css/admin.css'
import { storage } from '../../config/firebase';
import {ref, uploadBytes,updateMetadata} from 'firebase/storage'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';

export default function Admin() {
  
    const [upImg,setUpImg] = useState();
    const [imgUpError,setImgUpError] = useState();
    const handleImg=(e)=>{
        setUpImg(e.target.files[0]);
    }


   const [movieInfo, setMovieInfo] = useState({});

    const uploadImg = () =>{

        if(upImg == null) return;

        if (!upImg) {
            setImgUpError("No image selected for upload.");
            console.log('No image selected for upload.');
            return;
        }
    
        if (!movieInfo.mname || movieInfo.mname.trim() === "") {
            setImgUpError("Set the title of the image.");
            console.log('Set the title of the image.');
            return;
        }

        const imgRef = ref(storage,'moviesimg/'+ movieInfo.mname);

        uploadBytes(imgRef,upImg,movieInfo).then((snapshot)=>{

            const metadata = {
                contentType: 'image/jpeg',
                customMetadata: {
                    mname: movieInfo.mname,
                    minfo: movieInfo.minfo,
                    mrating: movieInfo.mrating,
                }
            };

            updateMetadata(snapshot.ref,metadata).then(()=>{console.log("Successfull metaupdate")}).catch
            ((err)=>{console.log("error",err)})

            console.log("Successfully uploaded")
        }).catch((err)=>{
            console.log("error : ",err);
        });

        
        
    };

    const handleMovieData = (e) =>{
        setMovieInfo((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

        console.log(movieInfo);
    }



    return (
    <div className='admin-main'>

            <div className="navbar-container-admin">
                <Navbar/>
            </div>
        
        <div className="admin-container">

            <div className="admin-form-container">
                <form action="">
                    <div className="title-form-admin">
                        <h1>Movie Register</h1> 
                    </div>
                    <input type="text" onChange={(e)=>handleMovieData(e)} name='mname' placeholder='Movies Name' />
                    <input type="text" onChange={(e)=>handleMovieData(e)} name='minfo' placeholder='Movies info' />
                    <input type="text" onChange={(e)=>handleMovieData(e)} name='mrating' placeholder='Movies imdb rating' />
                    <input type="file" onChange={(e)=>handleImg(e)} />
                    { imgUpError && <p>{imgUpError}</p>}
                </form>
            </div>

        </div>

        <div className="floating-button">
            <button onClick={uploadImg} >+</button>
        </div>

    </div>
  )
}
