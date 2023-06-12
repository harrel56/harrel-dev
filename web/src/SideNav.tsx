import React from "react";
import {MenuLink} from "./MenuLink";

export const SideNav = ({version}: { version: string }) => {
    return (
        <nav className='nav-container'>
            <ul className='nav'>
                <MenuLink href='/home' name='Home'/>
                <MenuLink href='/projects/json-schema' name='json-schema'/>
            </ul>

            <footer className='footer-container'>
                <p>{version}</p>
            </footer>
        </nav>
    )
}