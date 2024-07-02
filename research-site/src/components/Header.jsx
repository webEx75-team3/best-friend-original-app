import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>
                ずっともページ
            </h1>
            <nav>
                <ul>
                    <li><a href="/">ホーム</a></li>
                    <li><a href="/new-post">新規投稿</a></li>
                    <li><a href="/search">検索</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;