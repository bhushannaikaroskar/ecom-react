import React from 'react'

export default function ShoppingCartIcon() {
  return (
    <div className="badge-container flex flex-column">
        <span className="material-icons font-x-large">shopping_cart</span>
    </div>
  )
}

export function AccountIcon() {
    return (
    <div className="badge-container flex flex-column">
        <span className="material-icons font-x-large">account_circle</span>
    </div>
    )
  }
  
export function WishListIcon() {
    return (
      <div className="badge-container flex flex-column">
          <span className="material-icons font-x-large">favorite_border</span>
      </div>
    )
  }

export function DarkModeIcon() {
  return (
    <div className="badge-container flex flex-column">
        <span className="material-icons font-x-large">dark_mode</span>
    </div>
  )
}

export function SearchIcon(){
  return(
    <span className="material-icons font-x-large nav-search-icon">
        search
    </span>
  )
}