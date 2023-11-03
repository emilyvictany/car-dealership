import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const appUrl = `http://localhost:8080/api/appointments/`;
        try {
            const appResponse = await fetch(appUrl);
            if (appResponse.ok) {
                const appData = await appResponse.json();
                // console.log(autosData.autos)
                const appList = await appData.appointments;
                setAppointments(appList.filter((appointment) => appointment.status == "created"))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancel = async (id) => {
        const newAppList = appointments.filter((appointment) => appointment.id != id);
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const putOptions = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"status" : "canceled"})
        }
        const putResponse = await fetch(url, putOptions);
        if (putResponse.ok) {
            setAppointments(newAppList);
        }
    }

    const handleFinish = async (id) => {
        const newAppList = appointments.filter((appointment) => appointment.id != id);
        // console.log(newAppList);
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const putOptions = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"status" : "finished"})
        }
        const putResponse = await fetch(url, putOptions);
        if (putResponse.ok) {
            setAppointments(newAppList);
        }
    }

    return (
        <>
            <h1>Service Appointments</h1>
            <div>
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
                            <th>Action</th>
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

                            const date = `${month}/${day}/${year}`;
                            const time = `${hour}:${minutes} ${am_pm}`;

                            return (
                            <tr key = { appointment.id }>
                                <td>{ appointment.vin }</td>
                                <td>{ appointment.vipVIN ? "Yes" : "No" }</td>
                                <td>{ appointment.customer }</td>
                                <td>{ date } </td>
                                <td>{ time }</td>
                                <td>{ appointment.technician.first_name + ' ' + appointment.technician.last_name }</td>
                                <td>{ appointment.reason }</td>
                                <td>
                                    <button className='cancel' type='button' onClick={() => handleCancel(appointment.id)}> Cancel </button>
                                    <button className='finish' type='button' onClick={() => handleFinish(appointment.id)}> Finish </button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AppointmentList;
