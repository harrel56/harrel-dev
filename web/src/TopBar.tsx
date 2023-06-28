import {Button} from './Button'
import {SlMenu} from 'react-icons/sl'
import {RouterLink} from './RouterLink.tsx'
import {Dispatch, SetStateAction} from 'react'

export const TopBar = ({setMenuVisible}: { setMenuVisible: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <header className='top-bar'>
      <div className='top-header'>
        <SlMenu className='menu-icon' onClick={() => setMenuVisible(visible => !visible)}/>
        <RouterLink to='/'>
          <span className='logo'>Harrel.dev</span>
        </RouterLink>
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