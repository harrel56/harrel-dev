import React from 'react';
import ReactDOMClient from 'react-dom/client';

const App = () => {
    return <div className="main-container">Hello there</div>;
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!);
root.render(<App/>);