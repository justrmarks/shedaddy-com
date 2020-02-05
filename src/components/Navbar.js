import React, { useState } from "react"
import { Link } from "gatsby"
import logo from "../img/logo.svg"

const Navbar = props => {
  const [active, setActive] = useState(false)
  const navBarActiveClass = active ? "is-active" : ""

  const toggleHamburger = () => {
    // toggle the active boolean in the state
    setActive(!active)
  }

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="She Daddy" style={{ width: "160px" }} />
          </Link>

          {/* Hamburger menu */}
          <button
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${navBarActiveClass}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
