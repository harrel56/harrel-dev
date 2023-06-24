import {Link, useRoute} from "wouter";

export const MenuLink = ({href, name}: { href: string, name: string }) => {
    const [isActive] = useRoute(href)
    const classNames = 'nav-item ' + (isActive ? 'active' : '')
    return (
        <Link href={href}>
            <li className={classNames}>
                {name}
            </li>
        </Link>
    )
}