import {RouterLink} from "./RouterLink.tsx";
import {useContext} from 'react'
import {VersionContext} from './ctx/VersionContext.tsx'

export const SideBar = ({visible}: { visible: boolean }) => {
    const {imageVersion} = useContext(VersionContext)

    return (
        <nav className={'nav-container ' + (visible ? 'visible' : '')}>
            <ul className='nav'>
              <li className='nav-item'>
                <RouterLink to='/'>Home</RouterLink>
              </li>
              <li className='nav-item'>
                <RouterLink to='/json-schema'>JSON Schema</RouterLink>
              </li>
            </ul>

            <footer className='footer-container'>
                <p>{imageVersion}</p>
            </footer>
        </nav>
    )
}