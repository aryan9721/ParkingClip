import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import './assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
// create a new instance of axios
// const axiosInstance = axios.create();

// add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // add the token to the request header
    const token = localStorage.getItem('token');
    config.headers.authtoken = `${token}`;
    // console.log('token', token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    (response) => {
        // console.log(response);
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('login again!');
      }
      if (error.response.status === 500) {
        alert(`Error: ${error.response.data.message}. Please try again after sometime.`);
      }
      return Promise.reject(error);
    }
  );


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <HashRouter basename="/">
                <App />
            </HashRouter>
        </ReduxProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
