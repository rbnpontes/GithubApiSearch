import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HomeComponent} from './components/home/HomeComponent';
import {SearchComponent} from './components/search/SearchComponent';

const App: React.FC = () => {
  return (
    <div className="container">
      <SearchComponent/>
    </div>
  );
}

export default App;
