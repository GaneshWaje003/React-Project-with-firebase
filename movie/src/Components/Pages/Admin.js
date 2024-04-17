import React, { useState } from 'react'
import Navbar from '../comp/Navbar'
import '../css/admin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../config/firebase';
import {ref, uploadBytes,updateMetadata} from 'firebase/storage'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';

export default function Admin() {
  
    const [upImg,setUpImg] = useState();
    const [imgUpError,setImgUpError] = useState();
    const [movieCtg,setMovieCtg] = useState();

    const handleImg=(e)=>{
        setUpImg(e.target.files[0]);
    }

    const notify = (type,msg) =>{

        if(type === 'err'){
            toast.err(msg);
        }else{
            toast.success(msg);
        }

    }

   const [movieInfo, setMovieInfo] = useState({});

   const uploadImg = () => {
       
       if (!movieInfo.mname || movieInfo.mname.trim() === "") {
           setImgUpError("Set the title of the image.");
           return;
        }

        if (upImg == null) {
            setImgUpError("No image selected for upload.");
            return;
        }

    const imgRef = ref(storage, movieCtg + movieInfo.mname);

    uploadBytes(imgRef, upImg, movieInfo).then((snapshot) => {
        const metadata = {
            contentType: 'image/jpeg',
            customMetadata: {
                mname: movieInfo.mname,
                minfo: movieInfo.minfo,
                mrating: movieInfo.mrating,
                mlink:movieInfo.mtrailer,
                mdown:movieInfo.mdownurl
            }
        };

        
        updateMetadata(snapshot.ref, metadata)
            .then(() => { 
                notify('suc',"Data uploaded successfully") 
                setMovieInfo({
                    mname: '', 
                    minfo: '',
                    mrating: '',
                    mtrailer: '',
                    mdownurl: ''
                });
            })
            .catch((err) => { notify('err',`problem while uploading ${err}` ) });

    }).catch((err) => {
        console.log("Error uploading image:", err);
    });
};


    const handleMovieData = (e) =>{
        setMovieInfo((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

        console.log(movieInfo);
    }

    // getting movie category
    const getMovieCategory = (e) =>{

            if (e.target.value === 'Select Movie') {
                setImgUpError("Select the movie category");
            } else {
                setMovieCtg(e.target.value + '/');
            }
        
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
                    <input type="text" onChange={(e)=>handleMovieData(e)} name='mtrailer' placeholder='Movies trailer url' />
                    <input type="text" onChange={(e)=>handleMovieData(e)} name='mdownurl' placeholder='Movies Download url' />
                    <select className='movie-categary' onChange={(e)=>getMovieCategory(e)} >
                    <option value="" disabled >Select a car</option>
                        <option value="bollywood">bollywood</option>
                        <option value="hollywood">hollywood</option>
                        <option value="south">south</option>
                    </select>
                    <input type="file" onChange={(e)=>handleImg(e)} />
                </form>
                    { imgUpError && <p className='error-section'>{imgUpError}</p>}
            </div>
        </div>

        <div className="floating-button">
            <button onClick={uploadImg} >+</button>
        </div>
        <ToastContainer />
    </div>
  )
}
