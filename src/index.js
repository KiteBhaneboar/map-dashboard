import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

const root = createRoot(document.getElementById('root'));
mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbTc1IiwiYSI6ImNrYjhyYTN0YTA2emkyc3AwdG94c2ZjcmsifQ.Whu-ZPpnHEVZLr6NIZVFGQ';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
