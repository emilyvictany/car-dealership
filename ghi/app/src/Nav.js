import { NavLink, Link } from 'react-router-dom'
import React from "react"

function Nav() {
  return (
    <nav className="navbar navbar-start navbar-expand-lg navbar-dark" style={{ backgroundImage: "linear-gradient(140deg, #AB400C 0%, #ED8B16 50%, #E8E0D1 75%)" }}>
    <div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <NavLink className="navbar-brand btn fw-bold" to="/">Sunset Motors</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown me-2">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cars
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="nav-link" to="/manufacturers">Manufacturers</Link></li>
                <li><Link className="nav-link" to="/manufacturer/create">Create a Manufacturer</Link></li>
                <li><Link className="nav-link" to="/models">Models</Link></li>
                <li><Link className="nav-link" to="/model/new">Create a Model</Link></li>
                <li><Link className="nav-link" to="/automobiles">Automobiles</Link></li>
                <li><Link className="nav-link" to="/automobile/new">Create an Automobile</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown me-2">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="nav-link" to="/customer/create">Add a Customer</Link></li>
                <li><Link className="nav-link" to="/customers">Customers</Link></li>
                <li><Link className="nav-link" to="/sale/create">Record a New Sale</Link></li>
                <li><Link className="nav-link" to="/sales">Sales</Link></li>
                <li><Link className="nav-link" to="/salesperson/list">Salespeople</Link></li>
                <li><Link className="nav-link" to="/salesperson/create">Add a Salesperson</Link></li>
                <li><Link className="nav-link" to="/salesperson/history">Salesperson History</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown me-2">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="nav-link" to="/appointment/new">Create Appointment</Link></li>
                <li><Link className="nav-link" to="/appointments">Service Appointments</Link></li>
                <li><Link className="nav-link" to="/appointments/history">Service History</Link></li>
                <li><Link className="nav-link" to="/technician/new">Create Technician</Link></li>
                <li><Link className="nav-link" to="/technicians">Technicians</Link></li>
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </div>
    </nav>
  )
}

export default Nav;
