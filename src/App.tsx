import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {HomeComponent} from './components/home/HomeComponent';
import {SearchComponent} from './components/search/SearchComponent';
import { HeaderComponent } from './components/header/HeaderComponent';
const App: React.FC = () => {
  return (
    <section>
      <HeaderComponent/>
      <div>
        <Router>
          <Route exact path="/" component={HomeComponent}/>
          <Route path="/search/:id" component={SearchComponent}/>
          {/* <Route exact path="/" component={HomeComponent}/> */}
        </Router>
      </div>
    </section>
  );
}

export default App;
