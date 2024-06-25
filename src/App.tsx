import React, { Suspense } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { Provider } from 'react-redux';
import store from 'store';

function App() {
    return (
        <Provider store={store}>
            <Suspense fallback="">
                <div className="routes">{useRoutes(routes)}</div>
            </Suspense>
        </Provider>
    );
}

export default App;
