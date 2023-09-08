import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const TechnicianForm = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleChangeEmployeeId = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstname;
        data.last_name = lastname;
        data.employee_id = employeeId;
        // console.log(data);

        const techsUrl = `http://localhost:8080/api/technicians/`;
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const techsResponse = await fetch(techsUrl, fetchOptions);
        // console.log(techsResponse.ok)
        // console.log(techsResponse.status)
        if (techsResponse.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            // console.log('FORM SUBMITTED:' + techsResponse)
        }
    }

    return (
        <div className="container">
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChangeFirstName} value={firstname} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control"/>
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeLastName} value={lastname} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control"/>
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeEmployeeId} value={employeeId} placeholder="Employee ID" required type="text" id="employee_id" name="employee_id" className="form-control"/>
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
        </div>
    </div>
    );
}

export default TechnicianForm;
