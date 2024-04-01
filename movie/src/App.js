import logo from './logo.svg';
import './App.css';
import Navbar from './Components/comp/Navbar';
import { auth } from './config/firebase';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Dialog from './Components/comp/Dialog';
import ImgSlider from './Components/comp/ImgSlider';


function App() {

  var navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const [showDilog,setShowDilog] = useState(false);

  useEffect(()=>{
    const isAuthLoggedIn = auth.onAuthStateChanged((user)=>{
      if(user){
        console.log("user Is Siggned in");
        setIsUserLoggedIn(true);
      }else{
        console.log("user Is Siggned out");
        setIsUserLoggedIn(false);
        setShowDilog(true);
        
        setTimeout(()=>{
          setShowDilog(false);
          navigate('/login');
        },3000);

      }
    });


  },[]);


  return (
   <div className="app-main">
    {showDilog && <Dialog title={"About Login"} info={"Login first to access the data of Website"} />}
    
    <div className="navbar-container-home">
      <Navbar/>
    </div>

    <div className="main-home">

      <div className="imgslider-container-app">
        <ImgSlider/>
      </div>

    </div>

   </div>
  );
}

export default App;
