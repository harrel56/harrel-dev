import React, {useEffect, useState} from 'react';
import ReactDOMClient from 'react-dom/client';
import {SideBar} from "./SideBar";
import {Content} from "./Content";
import {TopBar} from "./TopBar";
import {useLocation} from "wouter";

const version = document.querySelector('meta[name="version"]')?.getAttribute('content')!

const App = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [location] = useLocation()

    useEffect(() => setMenuVisible(false), [location])

    return (
        <div className='main-container'>
            <TopBar setMenuVisible={setMenuVisible}/>
            <div className='center-container'>
                <SideBar version={version} visible={menuVisible}/>
                <Content/>
            </div>
        </div>)
}

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<App/>)