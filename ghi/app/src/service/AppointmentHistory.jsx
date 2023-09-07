import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

// const isVip = async (x) => {
//     const vinVOUrl = `http://localhost:8080/api/automobilesVO/`;
//         try {
//             const vinVOResponse = await fetch(vinVOUrl);
//             if (vinVOResponse.ok) {
//                 const vinVOData = await vinVOResponse.json();
//                 // console.log(vinVOData.automobiles)
//                 const vinVOObjects = await vinVOData.automobiles;
//                 for (let vinVOObject of vinVOObjects) {
//                     if (x == vinVOObject["vin"]) {
//                         return "Yes";
//                     }
//                 }
//                 return "No";
//                 // console.log("THIS IS THE LisT: ", vinVOList)
//             }
//         } catch (e) {
//             console.error(e)
//         }
// }

const AppointmentHistory = () => {
    // let vinVO = []
    const [appointments, setAppointments] = useState([]);
    // const [vinVO, setVinVO] = useState([])
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

        // const vinVOUrl = `http://localhost:8080/api/automobilesVO/`;
        //     try {
        //         const vinVOResponse = await fetch(vinVOUrl);
        //         if (vinVOResponse.ok) {
        //             const vinVOData = await vinVOResponse.json();
        //             // console.log(vinVOData.automobiles)
        //             const vinVOObjects = await vinVOData.automobiles;

        //             // console.log("THIS IS THE LisT: ", vinVOObjects)
        //             const vinList = await vinVOObjects.map((vinObj) => {return vinObj.vin});
        //             // console.log(vinList)
        //             vinVO = vinList
        //             // setVinVO(vinList);
        //             console.log(vinVO)
        //         }
        //     } catch (e) {
        //         console.error(e)
        //     }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
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
                        <th>Satus</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map( appointment => {
                        const currentDate = new Date(appointment.date_time);
                        let day = currentDate.getUTCDate();
                        let month = currentDate.getUTCMonth() + 1;
                        let year = currentDate.getUTCFullYear();

                        const time = currentDate.toUTCString().split(' ')[4];
                        const date = `${month}/${day}/${year}`;

                        return (
                        <tr key = { appointment.id }>
                            <td>{ appointment.vin }</td>
                            <td>{ 'hold' }</td>
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

    );
}

export default AppointmentHistory;
