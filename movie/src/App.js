import logo from './logo.svg';
import './App.css';
import Navbar from './Components/comp/Navbar';
import { auth, storage } from './config/firebase';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Dialog from './Components/comp/Dialog';
import ImgSlider from './Components/comp/ImgSlider';
import {ref,getDownloadURL,getMetadata, listAll} from 'firebase/storage'


function App() {

  // states ---------
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const [showDilog,setShowDilog] = useState(false);
  const [imgnames,setImgNames] = useState({});

  // other variable ---------------
  var navigate = useNavigate();

  // function 
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

  const readData= async()=>{
    try{

      const folderRef= ref(storage,'moviesimg');
      const folderList = await listAll(folderRef);
      const name = folderList.items.map(item=>item.fullPath); 
      setImgNames((prevstate)=>({...prevstate,name}));
      console.log(imgnames);
    }catch(err){
      console.log("error : ",err);
    }
  }


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

      <button onClick={readData}>read</button>

      <div className="img-container-api">
        {imgnames.map((imgname,index)=>(
          <h1>{imgname}</h1>
        )
        )}

      </div>

    </div>

   </div>
  );
}

export default App;
