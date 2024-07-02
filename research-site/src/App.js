import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Search from './pages/Search';

function App() {
  const path = window.location.pathname;

  let content;
  if (path === '/') {
    content = <Home />;   
  } else if (path === '/new-post') {
    content = <NewPost />;
  } else if (path === '/search') {
    content = <Search />;
  } else {
    content = <Home />;
  }

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {content}
      </main>
      <Footer />
    </div>
  );
};

export default App;
