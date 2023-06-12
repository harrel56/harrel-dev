import {Link, useRoute} from "wouter";
import React from "react";

export const MenuLink = ({href, name}: { href: string, name: string }) => {
    const [isActive] = useRoute(href)
    const classNames = 'nav-item ' + (isActive ? 'active' : '')
    return (
        <li className={classNames}>
            <Link href={href}>{name}</Link>
        </li>
    )
}