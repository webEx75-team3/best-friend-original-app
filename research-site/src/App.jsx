import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">ページタイトル</header>
      <div className="main">
        <div className="box">新規投稿</div>
        <div className="box">検索</div>
      </div>
      <footer className="footer">
        <p>お知らせ</p>
        <ul>
          <li>殿堂入りをするとここに掲載</li>
          <li>いいね数の変動で形が変わります</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
