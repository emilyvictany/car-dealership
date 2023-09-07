import React, { useState } from 'react'

function SalespersonForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeID, setEmployeeID] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.employee_id = employeeID

        const salespersonUrl = "http://localhost:8090/api/salespeople/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const salesperson = await fetch(salespersonUrl, fetchConfig);
        if (salesperson.ok) {
            const NewSalesperson = await salesperson.json()
            console.log(NewSalesperson)
            setFirstName('')
            setLastName('')
            setEmployeeID('')
        }
    }

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value
        setEmployeeID(value)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <center><h1>Add a Salesperson</h1></center>
                    <form onSubmit={ handleSubmit } id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={ handleFirstNameChange } placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={ handleLastNameChange } placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeID} onChange={ handleEmployeeIDChange } placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="address">Employee ID</label>
                        </div>
                        <center><button className="btn btn-primary">Create</button></center>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalespersonForm
