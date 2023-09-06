import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const TechnicianList = () => {
    const [techs, setTechs] = useState([]);
    const fetchData = async () => {
        const techUrl = `http://localhost:8080/api/technicians/`;

        try {
            const techsResponse = await fetch(techUrl);
            if (techsResponse.ok) {
                const techsData = await techsResponse.json();
                console.log(techsData.technicians)
                const techsList = techsData.technicians;
                setTechs(techsList)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {techs.map(tech => {
                    return (
                        <tr key = { tech.employee_id }>
                            <td>{ tech.employee_id }</td>
                            <td>{ tech.first_name }</td>
                            <td>{ tech.last_name } </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default TechnicianList;
