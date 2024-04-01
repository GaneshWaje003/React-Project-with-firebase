import React, { useEffect, useState } from 'react'
import '../css/login.css'
import google_logo from '../img/google_logo.svg'
import Navbar from '../comp/Navbar'
import { useNavigate } from 'react-router-dom';
import { auth , googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword ,signOut , signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import { NavLink } from 'react-router-dom'
import Dialog from '../comp/Dialog';

export default function Login() {

    const navigate = useNavigate();
    const [isLogin,setIsLogin]=useState(true);
    const [curruser,setCurrUser]=useState(null);
    const [username , SetUsername] = useState('');
    const [LoginError , SetLoginError] = useState('');
    const [currUserImgUrl,setCurrUserImgUrl]=useState('');
    

    const loggout = () =>{
            // signOut(auth).then(()=>{
            //     console.log("signout");
            // })

            const isSignout = auth.onAuthStateChanged((user)=>{
                if(user){
                    console.log("user logged in ");
                }else{
                    console.log("user logged out ");
                }
            })
    }
    
    // forgot password 
    const forgotPassword = async () =>{
        await sendPasswordResetEmail(auth,userData.email).then(()=>{console.log("successfully send",userData.email)}).
        catch((error)=>{console.log(error)})
    }   

    const [userData,setUserData] =useState({email:'',password:'',});
    
    const handleChange =(e)=>{
        
        setUserData({
            ...userData,
            [e.target.name]:e.target.value,
        });

        console.log(auth.currentUser?.email);

    };

    const LoginUser = async  ()=>{
        try{
            await signInWithEmailAndPassword(auth,userData.email,userData.password).then((userCred)=>{
                console.log("User signed in");
                setUserData({ email: '', password: '' });
                setCurrUserImgUrl(userCred.user.photoURL);
                changeProfileUrl();
                SetLoginError("");
                navigate('/');
            }).catch((err)=>{
                SetLoginError(err.message);
            });

            if(auth.currentUser.email == "ganeshwaje233@gmail.com"){
                navigate('/admin');
            }


        }catch(err){
            console.log("Signin Error : ",err);
        }        
    }

    const googleSignIn = async () =>{
        try{
            await signInWithPopup(auth,googleProvider).then(()=>{
                console.log("google sign in succesful");
                navigate('/');
            });
        }catch(err){
            console.log("error at signwithGOogle : ",err);
        }
        await changeProfileUrl();
    }

    const changeUsername =()=>{
        
        if(curruser && curruser.email){
   
            var atIndex = curruser.email.indexOf('@');
            if(atIndex !== -1){
                setCurrUser(curruser.email.substring(0,atIndex));
            }
        }
    }

     const changeProfileUrl = async () => {
        await setCurrUserImgUrl(auth?.currentUser?.photoURL);
      };

 

    return (
        <div className='login-main'>
            
            <div className="navbar">
                <Navbar/>
            </div>

            <div className="login-main-contianer">
              <div className="login-container">

                    <div className="login-elements">

                        <p className='login-header'>Login Page</p>

                        <div  className="input-login username">
                            <input name="email" onChange={(e)=>handleChange(e)} type="text" placeholder='Username' />
                        </div>
                        <div className="input-login password">
                            <input name='password' onChange={(e)=>handleChange(e)} type="password" placeholder='Password'/>
                            <a href="#" onClick={forgotPassword} >forgot passord</a>
                        </div>

                        <div className="login-button">
                            <button onClick={()=>LoginUser()} >Login</button>
                            <NavLink to="/register" >Not Registered ?</NavLink>
                        </div>

                        <div onClick={googleSignIn} className="login-with-google">
                            <img src={google_logo} alt="" />
                            <p>Login With Google</p>
                        </div>

                        {LoginError && <p className='login-error-p' >{LoginError}</p>}
                    </div>                


                    <div className="other-section">
                            
                            <div className="other-section-data">

                            <img src={currUserImgUrl} alt="" />
                            <p>Already Logged In</p>
                            <p>MOvies</p>

                            <button onClick={loggout} >logout</button>

                            </div>
                    </div>

                </div>

            </div>
            
        </div>
    )
}
