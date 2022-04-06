import React from 'react'
import { Link } from 'react-router-dom'
import { grandDarkLogo, grandLogo } from '../../assets'
import { useTheme } from '../../context'

export default function Logo() {

  const {theme} = useTheme();

  return (
    <Link to="/" className="nav-logo">
        <img src={theme==="light"?grandLogo:grandDarkLogo} alt="logo"/>
    </Link>
  )
}
