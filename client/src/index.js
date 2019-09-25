import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';

//Provider is importing the component Provider from the context.js file
import { Provider } from './components/Context';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Add the components into the HTML page
ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')); 

serviceWorker.unregister();
