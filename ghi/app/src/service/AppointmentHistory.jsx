import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('');
    const fetchData = async () => {


        const appUrl = `http://localhost:8080/api/appointments/`;

        try {
            const appResponse = await fetch(appUrl);
            if (appResponse.ok) {
                const appData = await appResponse.json();
                // console.log(autosData.autos)
                const appList = appData.appointments;
                setAppointments(appList)
            }
        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    const handleSearch = async (search) => {
        const searchList = appointments.filter((appointment) => appointment.vin == search);
        if (searchList.length > 0) {
            setAppointments(searchList)
        } else {
            fetchData() //resets the history list to original. consider adding this back in during stretch goals
            alert("VIN does not exist in current list.\n Returning to original list.")
        }
        // console.log(searchList);
    }

    return (
        <>
        <h1>Service History</h1>
        <div>
            <input onChange={handleChangeSearch} value={search} placeholder="Search" required type="search" id="search" name="search" className="form-control" />
                <button className='search' type='button' onClick={() => handleSearch(search)}> Search </button>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Satus</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map( appointment => {
                        const currentDate = new Date(appointment.date_time);
                        let day = currentDate.getUTCDate();
                        let month = currentDate.getUTCMonth() + 1;
                        let year = currentDate.getUTCFullYear();

                        const timeData = currentDate.toUTCString().split(' ')[4].split(":");
                        const hour = timeData[0] % 12 ? timeData[0] % 12 : 12;
                        const minutes = timeData[1]
                        const am_pm = currentDate.getUTCHours() >= 12 ? "PM" : "AM";
                        // console.log(am_pm)
                        const date = `${month}/${day}/${year}`;
                        const time = `${hour}:${minutes} ${am_pm}`;
                        // console.log(time)

                        return (
                        <tr key = { appointment.id }>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vipVIN ? "Yes" : "No" }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ date } </td>
                            <td>{ time }</td>
                            <td>{ appointment.technician.first_name + ' ' + appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default AppointmentHistory;
