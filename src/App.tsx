import React, { Suspense } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './router';

function App() {
    return (
        <Suspense fallback="">
            <div className="routes">{useRoutes(routes)}</div>
        </Suspense>
    );
}

export default App;
