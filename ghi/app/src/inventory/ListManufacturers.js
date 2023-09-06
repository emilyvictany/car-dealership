import React, { useState, useEffect } from 'react'
import "../index.css"

function ManufacturersList() {
    const [list, setList] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/")

        if (response.ok) {
            const data = await response.json()
            setList(data.manufacturers)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
        <h1>Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    {list?.map(manufacturers => {
                    return (
                    <tr key={manufacturers.id}>
                        <td>{ manufacturers.name }</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
        </>
        )
        }

export default ManufacturersList;
