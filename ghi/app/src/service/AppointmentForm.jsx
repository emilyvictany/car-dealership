import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const AppointmentForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [vin, setVin] = useState('');
    // const [status, setStatus] = useState('created');
    const [customer, setCustomer] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [technician, setTechnician] = useState(''); //value should be it's employee_id which is as str

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeDate = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleChangeTime = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleChangeReason = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleChangeTechnician = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleChangeCustomer = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.date_time = `${date} ${time}`;
        data.reason = reason;
        data.status = "created";
        data.vin = vin;
        data.customer = customer;
        data.technician = technician;
        console.log(data);

        const appUrl = `http://localhost:8080/api/appointments/`;
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const newAppResponse = await fetch(appUrl, fetchOptions);
        console.log(newAppResponse.ok)
        console.log(newAppResponse.status)
        if (newAppResponse.ok) {
            setDate('');
            setTime('');
            setReason('');
            setCustomer('');
            setVin('');
            setTechnician(0);
            console.log('FORM SUBMITTED:' + newAppResponse)
        }
    }

    return (
        <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an Appointment</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChangeDate} value={date} placeholder="Date" required type="date" id="date" name="date" className="form-control"/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeTime} value={time} placeholder="Time" required type="time" id="time" name="time" className="form-control"/>
                    <label htmlFor="time">Time</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handleChangeReason} value={reason} placeholder="Reason" required type="text" id="reason" name="reason" className="form-control"/>
                    <label htmlFor="reason">Reason</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeVin} value={vin} placeholder="VIN" required type="text" id="vin" name="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeCustomer} value={customer} placeholder="Customer" required type="text" id="customer" name="customer" className="form-control"/>
                    <label htmlFor="customer">Customer</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Technician</label>
                    <select required onChange={handleChangeTechnician} value={technician} id="technician" name="technician" className="form-select">
                        <option>Choose a technician</option>
                        {technicians.map(technician => {
                            const techName = technician.first_name + ' ' + technician.last_name;
                            return (
                                <option key={technician.employee_id} value={technician.employee_id}>{techName}</option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}

export default AppointmentForm;
