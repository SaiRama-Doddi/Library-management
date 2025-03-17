import React from 'react';

import './App.css';
import { Navbar } from './layouts/NavbarandFooter/Navbar';

import { Footer } from './layouts/NavbarandFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/' exact>
      <Redirect to='/home' />
        </Route>

        <Route path='/home' exact>
          <HomePage />
        </Route>


        <Route path='/search'>
          <SearchBooksPage />
        </Route>
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
