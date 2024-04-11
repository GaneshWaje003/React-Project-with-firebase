import logo from './logo.svg';
import './App.css';
import Navbar from './Components/comp/Navbar';
import { auth, storage } from './config/firebase';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Dialog from './Components/comp/Dialog';
import ImgSlider from './Components/comp/ImgSlider';
import { ref, getDownloadURL, getMetadata, listAll } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // states ---------
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const [showDilog, setShowDilog] = useState(false);
  const [imgnames, setImgNames] = useState({});
  const [imgSlider,setImgSlider] = useState();

  const [data, setData] = useState({
    bollywood: [],
    hollywood: [],
    south: [],
  })

  // other variable ---------------
  var navigate = useNavigate();

  // function 
  useEffect(() => {
    const isAuthLoggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user Is Siggned in");
        setIsUserLoggedIn(true);
        readData('hollywood');
        readData('bollywood');
        readData('south');

      } else {
        console.log("user Is Siggned out");
        setIsUserLoggedIn(false);
        setShowDilog(true);

        setTimeout(() => {
          setShowDilog(false);
          navigate('/login');
        }, 3000);

      }
    });
  }, []);


  // for storing the newly added movies 
  useEffect(() => {
    for(const cat in data){
      const lastItem = data[cat][data[cat].length - 1];
      setImgSlider(lastItem);
    }
  }, [data]);
  


  const readData = async (folder) => {
    try {

      const folderRef = ref(storage, folder);
      const folderList = await listAll(folderRef);
      const imgDetails = await Promise.all(
        folderList.items.map(async itemref => {
          const url = await getDownloadURL(itemref);
          const metadata = await getMetadata(itemref);
          const name = itemref.name;
          return { name, url, metadata };
        })
      );


      setData(prevState => ({
        ...prevState,
        [folder]: imgDetails
      }));

      await console.log(folder);
    } catch (err) {
      console.log("error : ", err);
    }
  }


  //open movie section
  const openMovie = (metadata, url) => {
    const customMetadata = metadata.customMetadata;
    toast("open mvoie!");
    navigate('/movieInfo', { state: { customMetadata, url } })
  }

  //listing all movies 
  const listAllMovies = (sendState) => {

    console.log(imgnames);
    navigate('/listAllMovies', { state: { sendState } })
  }


  return (
    <div className="app-main">
      {showDilog && <Dialog title={"About Login"} info={"Login first to access the data of Website"} />}

      <div className="navbar-container-home">
        <Navbar imgInfo={data} />
      </div>

      <div className="main-home">

        <div className="imgslider-container-app">
          <ImgSlider states={data} />
        </div>



        <div className="movie-container hollywood">


          <div className="header-section-movies">
            <p>{"Hollywood Movies"}</p>
            <button onClick={(e) => listAllMovies(data.hollywood)} >&gt;</button>
          </div>




          <div className="img-container-api">

            {Object.values(data.hollywood).map((imgData, index) => (
              <div className="card-container" key={index}>

                <div onClick={() => openMovie(imgData.metadata, imgData.url)} className="img-card">
                  <img src={imgData.url} />
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="movie-container bollywood">


          <div className="header-section-movies">
            <p>{"Bollywood Movies"}</p>
            <button onClick={(e) => listAllMovies(data.bollywood)} >&gt;</button>
          </div>

          <div className="img-container-api">

            {Object.values(data.bollywood).map((imgData, index) => (
              <div className="card-container" key={index}>

                <div onClick={() => openMovie(imgData.metadata, imgData.url)} className="img-card">
                  <img src={imgData.url} />
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="movie-container bollywood">


          <div className="header-section-movies">
            <p>{"South Movies"}</p>
            <button onClick={(e) => listAllMovies(data.south)} >&gt;</button>
          </div>

          <div className="img-container-api">

            {Object.values(data.south).map((imgData, index) => (
              <div className="card-container" key={index}>

                <div onClick={() => openMovie(imgData.metadata, imgData.url)} className="img-card">
                  { imgData.url ? ( <img src={imgData.url} />):(<div className='placeholder'></div>)}
                </div>

              </div>
            ))}
          </div>
        </div>




      </div>
      <ToastContainer />

    </div >
  );
}

export default App;
