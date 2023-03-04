import React from 'react';
import ReactDOMClient from 'react-dom/client';

const version = document.querySelector('meta[name="version"]')?.getAttribute('content')

const App = () => {
    return (
        <div className='main-container'>
            <div className='content-container'>Hi</div>
            <div className='footer-container'>
                <p>{version}</p>
            </div>
        </div>);
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!);
root.render(<App/>);