import React from "react";
import {MenuLink} from "./MenuLink";

export const SideBar = ({version, visible}: { version: string, visible: boolean }) => {
    return (
        <nav className={'nav-container ' + (visible ? 'visible' : '')}>
            <ul className='nav'>
                <MenuLink href='/' name='Home'/>
                <MenuLink href='/projects/json-schema' name='JSON Schema'/>
            </ul>

            <footer className='footer-container'>
                <p>{version}</p>
            </footer>
        </nav>
    )
}