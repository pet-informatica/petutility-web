import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';

injectTapEventPlugin();

ReactDOM.render(
    <BrowserRouter >
        <App/>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
