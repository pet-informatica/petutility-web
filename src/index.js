import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

const store = createStore(reducers);

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
