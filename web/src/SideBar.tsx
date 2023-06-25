import {MenuLink} from "./MenuLink";
import {useFetch} from "use-http";

export const SideBar = ({visible}: { visible: boolean }) => {
    const {data} = useFetch<any>('/api/version', {}, [])

    return (
        <nav className={'nav-container ' + (visible ? 'visible' : '')}>
            <ul className='nav'>
                <MenuLink href='/' name='Home'/>
                <MenuLink href='/projects/json-schema' name='JSON Schema'/>
            </ul>

            <footer className='footer-container'>
                {data && <p>{data}</p>}
            </footer>
        </nav>
    )
}