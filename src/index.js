import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

// For React version 18 +
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// Deprecated in React Version 18 +
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// reportWebVitals();
