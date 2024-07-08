import { useState } from 'react';

export default function Review() {
  // 入力フィールドの状態を作る
  const [username, setUsername] = useState('');
  const [place, setPlace] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // フォームが送信されたときの処理
  const handleSubmit = (event) => {
    event.preventDefault(); // ページのリロードを防ぐ
    // 新しいレビューオブジェクトを作成する
    const newReview = {
      username,
      place,
      rating,
      review,
    };
    // 新しいレビューをレビューリストに追加する
    setReviews([...reviews, newReview]);
    alert(`レビューが送信されました: ${review}`); // レビューを表示する
    // フォームをリセットする
    setUsername('');
    setPlace('');
    setRating('');
    setReview('');
  };

  return (
    <div>
      <h1>地名に対するレビューを書く</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="ユーザー名"
        />
        <br />
        <input
          type="text"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          placeholder="地名"
        />
        <br />
        <input
          type="text"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          placeholder="評価 (1-5)"
        />
        <br />
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="ここにレビューを書いてください"
        />
        <br />
        <button type="submit">送信</button>
      </form>
      <h2>送信されたレビュー</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>ユーザー名:</strong> {review.username} <br />
            <strong>地名:</strong> {review.place} <br />
            <strong>評価:</strong> {review.rating} <br />
            <strong>レビュー:</strong> {review.review}
          </li>
        ))}
      </ul>
    </div>
  );
}
