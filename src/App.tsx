import React from 'react';

import './App.css';
import { Navbar } from './layouts/NavbarandFooter/Navbar';

import { Footer } from './layouts/NavbarandFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
     
      <Footer />
    </div>

  );
}

export default App;
