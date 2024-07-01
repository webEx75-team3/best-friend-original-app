import type { LinksFunction } from "@remix-run/node";
import styleUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styleUrl },
  ];
};

export default function Index() {
  return (
    <div className="container">
      <header className="header">
        <h1>ページタイトル</h1>
      </header>
      <main className="main">
        <div className="box new-post">新規投稿</div>
        <div className="box search">検索</div>
        <div className="notifications">
          <h2>お知らせ</h2>
          <ul>
            <li>殿堂入りをするとここに掲載</li>
            <li>いいね数の変動で形が変わります</li>
          </ul>
        </div>
      </main>
    </div>

  );
}
