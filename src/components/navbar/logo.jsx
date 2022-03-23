import React from 'react'
import { Link } from 'react-router-dom'
import { grandDarkLogo,grandLogo } from '../../assets'

export default function Logo() {
  console.log(process.env.PUBLIC_URL)
  return (
    <Link to="/" className="nav-logo">
        <img src={grandLogo} alt="logo"/>
    </Link>
  )
}
