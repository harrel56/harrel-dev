import {RouterLink} from "./RouterLink.tsx";
import {useFetch} from "use-http";

export const SideBar = ({visible}: { visible: boolean }) => {
    const {data} = useFetch<any>('/api/version', {}, [])

    return (
        <nav className={'nav-container ' + (visible ? 'visible' : '')}>
            <ul className='nav'>
              <li className='nav-item'>
                <RouterLink to='/'>Home</RouterLink>
              </li>
              <li className='nav-item'>
                <RouterLink to='/projects/json-schema'>JSON Schema</RouterLink>
              </li>
            </ul>

            <footer className='footer-container'>
                {data && <p>{data}</p>}
            </footer>
        </nav>
    )
}