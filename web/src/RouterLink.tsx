import {NavLink} from 'react-router-dom'
import {PropsWithChildren} from 'react'

export const RouterLink = ({to, children}: PropsWithChildren<{ to: string }>) => {
  return <NavLink to={to} className='router-link'>{children}</NavLink>
}