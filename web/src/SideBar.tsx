import React from "react";
import {MenuLink} from "./MenuLink";

export const SideBar = ({version}: { version: string }) => {
    return (
        <nav className='nav-container'>
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