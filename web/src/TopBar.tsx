import React from "react";
import {Button} from "./Button";
import {Link} from "wouter";
import {SlMenu} from 'react-icons/sl'

export const TopBar = ({setMenuVisible}: {setMenuVisible:  React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <header className='top-bar'>
            <div className='top-header'>
                <SlMenu className='menu-icon' onClick={() => setMenuVisible(visible => !visible)}/>
                <Link href='/'>
                    <span className='logo'>Harrel.dev</span>
                </Link>
            </div>
            <div className='buttons'>
                <a href='https://github.com/harrel56/harrel-dev'>
                    <Button type='inverted'>Source</Button>
                </a>
                <a href='https://github.com/harrel56'>
                    <Button type='white'>GitHub</Button>
                </a>
            </div>
        </header>)
}