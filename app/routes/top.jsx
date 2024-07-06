import React from "react";
//import "./top.css";  // CSSファイルをインポート

//export function links() {
//  return [{ rel: "stylesheet", href: "./top.css" }];
//}

const Top = () => {
  return (
    <div className="container">
      <header className="header">ずっともページ</header>
      <div className="main-content">
        <div className="box">新規投稿</div>
        <div className="box">検索</div>
        <div className="footer">
          <p>お知らせ</p>
          <ul>
            <li>殿堂入れするとここに掲載</li>
            <li>いいねの数の変動で形が変わります</li>
            <li>気軽に投稿よろしくお願いします!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Top;

