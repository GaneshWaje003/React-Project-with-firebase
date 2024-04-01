import React, { useState } from 'react';
import '../css/imgslider.css';

import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';

export default function ImgSlider() {
  const [imgPointer, setImgPointer] = useState(0);
  const imgList = [img1, img2, img3, img4];

  const leftRotate = () => {
    setImgPointer((prevPointer) => (prevPointer + 1) % imgList.length);
  };

  const rightRotate = () => {
    setImgPointer((prevPointer) => (prevPointer - 1 + imgList.length) % imgList.length);
  };

  return (
    <div className='imgslider-main'>
      <div className="imgslider-container">
        <a onClick={leftRotate} href="#">&lt;</a>
        <div className="images-imgslider">
          <div className="img-holder-1">
            <img src={imgList[imgPointer]} style={{transition:'all 0.5s ease'}} alt="" />
          </div>  
        </div>
        <a onClick={rightRotate} href="#">&gt;</a>
      </div>
    </div>
  );
}
