import { NavLink } from 'react-router-dom'
import React from "react"

function Nav() {
  return (
    // remove "expand" for it to be a hamburger menu at all times
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid flex-1" >
        <NavLink className="navbar-brand " to="/">CarCar</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">

        <li>
            <details>
              <summary>
                Cars
              </summary>
              {/* <ul className="p-2 bg-base-100"> */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink></li>
                <li><NavLink className="nav-link" to="/manufacturer/create">Create a Manufacturer</NavLink></li>
                <li><NavLink className="nav-link" to="/models">Models</NavLink></li>
                <li><NavLink className="nav-link" to="/model/new">Create a Model</NavLink></li>
                <li><NavLink className="nav-link" to="/automobiles">Automobiles</NavLink></li>
                <li><NavLink className="nav-link" to="/automobile/new">Create an Automobile</NavLink></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                Sales
              </summary>
              {/* <ul className="p-2 bg-base-100"> */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><NavLink className="nav-link" to="/customer/create">Add a Customer</NavLink></li>
                <li><NavLink className="nav-link" to="/customers">Customers</NavLink></li>
                <li><NavLink className="nav-link" to="/sale/create">Record a New Sale</NavLink></li>
                <li><NavLink className="nav-link" to="/sales">Sales</NavLink></li>
                <li><NavLink className="nav-link" to="/salesperson/list">Salespeople</NavLink></li>
                <li><NavLink className="nav-link" to="/salesperson/create">Add a Salesperson</NavLink></li>
                <li><NavLink className="nav-link" to="/salesperson/history">Salesperson History</NavLink></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                Services
              </summary>
              {/* <ul className="p-2 bg-base-100"> */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><NavLink className="nav-link" to="/appointment/new">Create Appointment</NavLink></li>
                <li><NavLink className="nav-link" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="nav-link" to="/appointments/history">Service History</NavLink></li>
                <li><NavLink className="nav-link" to="/technician/new">Create Technician</NavLink></li>
                <li><NavLink className="nav-link" to="/technicians">Technicians</NavLink></li>
              </ul>
            </details>
          </li>

        </div>
      </div>
    </nav>
  )
}

export default Nav;
