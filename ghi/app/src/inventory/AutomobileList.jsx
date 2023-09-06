import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../index.css'

const AutomobileList = () => {
    // console.log('list of automobiles')
    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const autosUrl = `http://localhost:8100/api/automobiles/`;

        try {
            const autosResponse = await fetch(autosUrl);
            if (autosResponse.ok) {
                const autosData = await autosResponse.json();
                // console.log(autosData.autos)
                const autosList = autosData.autos;
                setAutos(autosList)
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
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                    return (
                        <tr key = { auto.vin }>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year } </td>
                            <td>{ auto.model.manufacturer.name }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.sold ? "Yes" : "No" }</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default AutomobileList;
