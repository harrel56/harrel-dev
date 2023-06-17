import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {SideBar} from "./SideBar";
import {Content} from "./Content";
import {TopBar} from "./TopBar";

const version = document.querySelector('meta[name="version"]')?.getAttribute('content')!

const App = () => {
    return (
        <div className='main-container'>
            <TopBar/>
            <div className='center-container'>
                <SideBar version={version}/>
                <Content/>
            </div>
        </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<App/>)