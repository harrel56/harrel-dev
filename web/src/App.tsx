import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {SideNav} from "./SideNav";
import {Content} from "./Content";

const version = document.querySelector('meta[name="version"]')?.getAttribute('content')!

const App = () => {
    return (
        <div className='main-container'>
            <SideNav version={version}/>
            <Content/>
        </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<App/>)