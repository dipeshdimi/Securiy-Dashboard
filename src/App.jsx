import { useState } from 'react';
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Dashboard searchQuery={searchQuery} />
    </div>
  );
}

export default App;
