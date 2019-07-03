import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components';

const appEl = document.getElementById('app');

ReactDOM.render(<Home />, appEl, () => {
  console.log('DOM rendered.');
});
