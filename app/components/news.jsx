import { useState } from 'react';

function PostPage() {
    const [likes, setLikes] = useState(0);
    const [notification, setNotification] = useState('');

    const handleLike = () => {
        const newLikes = likes + 1;
        setLikes(newLikes);

        if (newLikes >= 1000) {
            setNotification("いいね数が1000に到達しました!");

        }
    };

    return (
        <div>
          <h1>投稿ページ</h1>
          <p>いいね数: {likes}</p>
          <button onClick={handleLike}>いいね！</button>
          {notification && <Notification message={notification} />}
        </div>
      );
      
}

function Notification ({ message }) {
    return (
        <div>
            <h2>お知らせ</h2>
            <p>{message}</p>
        </div>
    );
}

export default PostPage;