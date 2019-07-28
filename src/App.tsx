import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { HomeComponent } from './components/home/HomeComponent';
import { SearchComponent } from './components/search/SearchComponent';
import { HeaderComponent } from './components/header/HeaderComponent';
import { ProfileComponent } from './components/profile/ProfileComponent';
const App: React.FC = () => {
  return (
    <section>
      <Router>
        <HeaderComponent />
        <div>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/search/:id" component={SearchComponent} />
          <Route path="/profile/:id" component={ProfileComponent}/>
          {/* <Route exact path="/" component={HomeComponent}/> */}
        </div>
      </Router>
    </section>
  );
}

export default App;
