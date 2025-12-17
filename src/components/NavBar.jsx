import React from 'react'
import "./css/NavBar.css"
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className='navBar'>
      <Link href="/">
        <svg width="50" height="50" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="68.5" height="68.5" rx="7.25" stroke="var(--accent-100)" strokeWidth="1.5"/>
          <path d="M17.1133 63H28.1133L39.1133 8H28.1133L17.1133 63Z" stroke="var(--accent-100)"/>
          <path d="M19.1151 53L17.1151 63C9.70665 62.9821 7.43232 61.0816 8.11508 53H19.1151Z" stroke="var(--accent-100)"/>
          <path d="M47 63H30L32 53H49L47 63Z" stroke="var(--accent-100)"/>
          <path d="M56 18H39L41 8H58L56 18Z" stroke="var(--accent-100)"/>
          <path d="M34.6016 40H48.5869L50.5984 30H36.5959L34.6016 40Z" stroke="var(--accent-100)"/>
        </svg>
      </Link>
          <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/AddElement">Add UI</Link></li>
              <li><Link href="/PlayBook">PlayBook</Link></li>
          </ul>
    </div>
  )
}

export default NavBar