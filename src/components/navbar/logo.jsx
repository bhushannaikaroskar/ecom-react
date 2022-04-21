import React from 'react'
import { Link } from 'react-router-dom'
import { grandDarkLogo, grandLogo } from '../../assets'
import { useProductContext, useTheme } from '../../context'

export default function Logo() {

  const {theme} = useTheme();
  const {setSearchValue} = useProductContext()

  return (
    <Link to="/" className="nav-logo"
    onClick={()=>setSearchValue("")}>
        <img src={theme==="light"?grandLogo:grandDarkLogo} alt="logo"/>
    </Link>
  )
}
