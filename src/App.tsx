import React from 'react';

import './App.css';
import { Navbar } from './layouts/NavbarandFooter/Navbar';

import { Footer } from './layouts/NavbarandFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckOutpage } from './layouts/BookCheckOutPage/BookCheckOutPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
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

        <Route path='/checkout/:bookId'>
         <BookCheckOutpage />
        </Route>
      </Switch>
      </div>
      <Footer />
    </div>

  );
}

export default App;
