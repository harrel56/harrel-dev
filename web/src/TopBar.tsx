import React from "react";
import {Button} from "./Button";
import {Link} from "wouter";

export const TopBar = () => {
    return (
        <header className='top-bar'>
            <Link href='/'>
                <span className='logo'>Harrel.dev</span>
            </Link>
            <div className='buttons'>
                <a href='https://github.com/harrel56'>
                    <Button type='white'>GitHub</Button>
                </a>
            </div>
        </header>)
}