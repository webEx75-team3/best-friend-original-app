import React from 'react';
import MapComponent from '../component/MapComponent';


function App() {
  return (
    <div className="App">
      <h1>Google Maps Search</h1>
      <MapComponent  />
    </div>
  );
}

export default App;

/*
const SearchComponent = ({ items }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const items = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python'];
  const apiKey = 'AIzaSyBk34MJtHoEDYT7xu9SW4Jl4ctJZP9JZ-U'; // 取得したAPIキーをここに入力

  return (
    <div>
      <h1>検索機能とGoogleマップのデモ</h1>
      <SearchComponent items={items} />
      <MapComponent apiKey={apiKey} />
    </div>
  );
};

export default App;

*/
