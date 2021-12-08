
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import { Provider } from 'react-redux';
import "datatables.net-bs4/js/dataTables.bootstrap4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import {CookiesProvider} from 'react-cookie'
const app = (
  <CookiesProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </CookiesProvider>
)
ReactDOM.render(app, document.getElementById('root')
);

reportWebVitals();
