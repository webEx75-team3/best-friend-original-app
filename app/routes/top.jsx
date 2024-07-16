import React, { useState, useEffect } from 'react';
import '../stylesheets/top.css'; 

const images = [
  'https://www.nta.co.jp/media/tripa/static_contents/nta-tripa/item_images/images/000/181/707/medium/58caabf7-26f3-4bae-9a13-b1353f25f175.jpg?1659483469',
  'https://www.rere.jp/beginners/uploads/2018/12/5875dcfc67437790d678e15db9fe85c3_s.jpg',
  'https://static.retrip.jp/article/67263/images/67263960315e2-33f2-499f-aa00-9588bfb26a8a_l.jpg',
  'https://s3-ap-northeast-1.amazonaws.com/cdn.tabi-biyori.jp/production/posts/eyecatches/000/000/802/original.jpg?'
];

const Top = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalid = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalid);
  }, []);

  const handleExpolerClick = () => {
    window.location.href = '/index';
  }

  return (
    <div className="container">
      <div className="header">日本新規開拓</div>
      <div className="banner">
        <span className="banner-text">日本の新たな穴場スポットを発掘しよう！</span>
      </div>
      <div className="image-container">
        <img src={images[currentImageIndex]} alt="Scenery"/>
      </div>
      <div className="button-container">
        <button className="explore-button" onClick={handleExpolerClick}>発掘</button>
      </div>
    </div>
  );
};

export default Top; 



