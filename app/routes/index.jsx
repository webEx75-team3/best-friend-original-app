import React from 'react';
import MapComponent from '../component/MAP';
import '../stylesheets/index.css'; 

function App() {
  return (
    <div className="App">
      <h1>Google Maps Search</h1>
      <MapComponent />
      <div className="banner">
        <span className="banner-text">お知らせ欄</span>
        <p>殿堂入りスポットがここに掲載されます。皆さん、気軽に投稿お願いします!</p>
      </div>
    </div>
  );
}

export default App;
