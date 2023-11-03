import { NavLink } from 'react-router-dom'
import React from "react"

function Nav() {
  return (
    <div>
    {/* remove "expand" for it to be a hamburger menu at all times */}
      <nav className="navbar navbar-start navbar-expand-lg bg-success">
        <div className="container-fluid flex-1" >
          <NavLink className="navbar-brand btn btn-ghost normal-case text-xl" to="/">Sunset Motors</NavLink>
        </div>
        <div className="collapse navbar-collapse justify-content-center" >

          <div className="dropdown">
            <details className="dropdown">
              <summary className="m-1 btn">
                Cars
              </summary>
              <div className="p-2 shadow menu-vertical bg-base-100 rounded-box w-52">
                <div><NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink></div>
                <div><NavLink className="nav-link" to="/manufacturer/create">Create a Manufacturer</NavLink></div>
                <div><NavLink className="nav-link" to="/models">Models</NavLink></div>
                <div><NavLink className="nav-link" to="/model/new">Create a Model</NavLink></div>
                <div><NavLink className="nav-link" to="/automobiles">Automobiles</NavLink></div>
                <div><NavLink className="nav-link" to="/automobile/new">Create an Automobile</NavLink></div>
              </div>
            </details>
          </div>

          <div className="dropdown">
            <details className="flex-col space-y-2">
              <summary className="m-1 btn">
                Sales
              </summary>
              <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <div><NavLink className="nav-link" to="/customer/create">Add a Customer</NavLink></div>
                <div><NavLink className="nav-link" to="/customers">Customers</NavLink></div>
                <div><NavLink className="nav-link" to="/sale/create">Record a New Sale</NavLink></div>
                <div><NavLink className="nav-link" to="/sales">Sales</NavLink></div>
                <div><NavLink className="nav-link" to="/salesperson/list">Salespeople</NavLink></div>
                <div><NavLink className="nav-link" to="/salesperson/create">Add a Salesperson</NavLink></div>
                <div><NavLink className="nav-link" to="/salesperson/history">Salesperson History</NavLink></div>
              </div>
            </details>
          </div>

          <div className="dropdown">
            <details className="dropdown menu">
              <summary className="m-1 btn">
                Services
              </summary>
              <div className="menu flex-col space-y-2 dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <div><NavLink className="nav-link" to="/appointment/new">Create Appointment</NavLink></div>
                <div><NavLink className="nav-link" to="/appointments">Service Appointments</NavLink></div>
                <div><NavLink className="nav-link" to="/appointments/history">Service History</NavLink></div>
                <div><NavLink className="nav-link" to="/technician/new">Create Technician</NavLink></div>
                <div><NavLink className="nav-link" to="/technicians">Technicians</NavLink></div>
              </div>
            </details>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Nav;
