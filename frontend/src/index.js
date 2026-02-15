import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';

// 1. Import Redux Provider and YOUR Store
import { Provider } from 'react-redux';
import { store } from './app/store'; // Make sure path is correct!

const root = ReactDOM.createRoot(document.getElementById('root'));

// 2. Wrap App inside Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);