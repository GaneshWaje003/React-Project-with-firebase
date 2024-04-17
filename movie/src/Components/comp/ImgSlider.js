import React, { useEffect, useState } from 'react';
import '../css/imgslider.css';

export default function ImgSlider({states}) {
  const [imgPointer, setImgPointer] = useState(0);
  const [imglist,setImgList] = useState([]);

  useEffect(() => {

    let images = [];

    if(states){
      for(const obj in states){
          for(const sub in states[obj]){
            images.push(states[obj][sub]);
          }
      }
      setImgList(images);
    }

  }, [states]);
  

  const leftRotate = () => {
    setImgPointer((prevPointer) => (prevPointer + 1) % imglist.length);
  };

  const rightRotate = () => {
    setImgPointer((prevPointer) => (prevPointer - 1 + imglist.length) % imglist.length);
  };

  return (
    <div className='imgslider-main'>
      <div className="imgslider-container">
        <a onClick={leftRotate} href="#">&lt;</a>
        <div className="images-imgslider">
          <div className="img-holder-1">
           
          {
            imglist.length > 0 && <img src={imglist[imgPointer].url} alt="" />
          }

          </div>  
        </div>
        <a onClick={rightRotate} href="#">&gt;</a>
      </div>
    </div>
  );
}
