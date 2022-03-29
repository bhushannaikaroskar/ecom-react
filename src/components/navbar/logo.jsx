import React from 'react'
import { Link } from 'react-router-dom'
import { grandLogo } from '../../assets'

export default function Logo() {
  return (
    <Link to="/" className="nav-logo">
        <img src={grandLogo} alt="logo"/>
    </Link>
  )
}
