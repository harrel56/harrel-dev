import {useEffect, useState} from 'react'
import {SideBar} from './SideBar'
import {TopBar} from './TopBar'
import {useLocation, useOutlet} from 'react-router-dom'

export const App = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const location = useLocation()
  const outlet = useOutlet()

  useEffect(() => setMenuVisible(false), [location])

  return (
    <div className='main-container'>
      <TopBar setMenuVisible={setMenuVisible}/>
      <div className='center-container'>
        <SideBar visible={menuVisible}/>
        <div className='content-container'>
          {outlet}
        </div>
      </div>
    </div>)
}