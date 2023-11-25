import {Button} from './Button'
import {SlMenu} from 'react-icons/sl'
import {RouterLink} from './RouterLink.tsx'
import {Dispatch, SetStateAction, useContext} from 'react'
import {GoMoon, GoSun} from 'react-icons/go'
import {ThemeContext} from './ctx/ThemeContext.tsx'

export const TopBar = ({setMenuVisible}: { setMenuVisible: Dispatch<SetStateAction<boolean>> }) => {
  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <header className='top-bar'>
      <div className='top-header'>
        <SlMenu className='menu-icon' onClick={() => setMenuVisible(visible => !visible)}/>
        <RouterLink to='/'>
          <span className='logo'>Harrel.dev</span>
        </RouterLink>
      </div>
      <div className='buttons'>
        <Button onClick={toggleTheme} type='inverted'>
          {theme === 'dark' ?
            <GoSun/> :
            <GoMoon/>}
        </Button>
        <a href='https://github.com/harrel56/harrel-dev'>
          <Button type='inverted'>Source</Button>
        </a>
        <a href='https://github.com/harrel56'>
          <Button type='white'>GitHub</Button>
        </a>
      </div>
    </header>)
}