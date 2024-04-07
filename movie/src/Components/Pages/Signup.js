import React, { useState } from 'react';
import '../css/signup.css';
import userlogo from '../img/user_svg.svg';
import keylogo from '../img/key_svg.svg';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../comp/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
    
    const moviecollectionRef = collection(db, "users");
    const [userData,setUserData]=useState({});
    const [formError,setFormError]=useState('');
    
    
    // crating the toast 
    const succTOast = (msg) => toast.success(msg,{
        position:"top-center"
    });

    const errTOast = (msg) => toast.error(msg,{
        position:"top-center"
    });
    

    const registerUser = async (event) => {
        
        event.preventDefault(); // Prevent default form submission behavior
        
        if(!userData.userfullname){
            setFormError("Enter full name of user");
        }else if(userData.username.length < 5 ){
            setFormError("Username must greater than 5 letters")   
        }
        else if(userData.password.length < 8 ){
            setFormError("password  must greater than 8 letters")   
        }
        else{
            setFormError("")   
            await addDoc(moviecollectionRef,{
                email:userData.email,
                gender:"null",
                name:userData.userfullname,
                password:userData.password,
                username:userData.username
            }).then(()=>{
                console.log("fire store success");
                succTOast("user data uploaded to firestore");
            });
            
            await createUserWithEmailAndPassword(auth,userData.email,userData.password).then(()=>{
                succTOast("user created successfully");
            }).catch((err)=>{
                errTOast(`error come while creating ${err}`);
            });
        }

    }

    const handelInput=(e)=>{

        setUserData(prevState=>({
            ...prevState,[e.target.name]:e.target.value
        }));
    }   


    return (
        <div className='register-main'>

            <div className="navbar-contianer-reg">
                <Navbar/>
            </div>

            <div className="main-reg-container">


            <div className="container-form">
                <form onSubmit={registerUser}>
                    <div className="header-reg">
                        <h1>REGISTER</h1>
                    </div>
                    <div className="register-input-container reg-fullname">
                        <input onChange={(e)=>handelInput(e)} name='userfullname' type="text" placeholder='Enter Full Name ' required />
                    </div>
                    <div className="register-input-container reg-birthday">
                        <input onChange={(e)=>handelInput(e)} id="birthdate" type="date" />
                    </div>
                    <div className="register-input-container reg-gender">
                        <p>Gender</p>
                        <div className="gender-container male">
                            <label htmlFor="male">Male</label>
                            <input  id="male" type="radio" />
                        </div>
                        <div className="gender-container female">
                            <label htmlFor="female">Female</label>
                            <input name='gender' id="female" type="radio" />
                        </div>
                    </div>
                    <div className="register-input-container reg-email">
                        <input onChange={(e)=>handelInput(e)} name='email' type="email" placeholder='Enter Email' required/>
                        <div className="verify-email">
                            <button>Verify</button>
                            <input type="text" placeholder='Enter OTP' />
                        </div>
                    </div>
                    <div className="register-input-container reg-username">
                        <img src={userlogo} alt="" />
                        <input onChange={(e)=>handelInput(e)} name='username' type="text" placeholder='Enter Username' required/>
                    </div>
                    <div className="register-input-container reg-password">
                        <img src={keylogo} alt="" />
                        <input onChange={(e)=>handelInput(e)} name='password' type="text" placeholder='Enter Password' required/>
                    </div>
                    <div className="register-input-container reg-btn">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
            {formError && <p className='error-section'>{formError}</p>}
            </div>
            <ToastContainer />
        </div>
    );
}
