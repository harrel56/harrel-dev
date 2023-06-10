import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {Link, Route} from "wouter";

const version = document.querySelector('meta[name="version"]')?.getAttribute('content')

const a1 = () => <h1>a1</h1>
// const b1 = () => <h1>b1</h1>

const App = () => {
    return (
        <div className='main-container'>
            <div className='content-container'>Hi</div>
            <button onClick={() => history.pushState({}, '', '/que')}>history</button>

            <div className='footer-container'>
                <p>{version}</p>
            </div>
        </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<App/>)