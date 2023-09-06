import React, { useState } from 'react'
import "../index.css"

function ManufacturerForm() {
    const[name, setName] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name

    const url = "http://localhost:8100/api/manufacturers/"
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const manufacturer = await fetch(url, fetchConfig)
    if (manufacturer.ok) {
        const newManufacturer = await manufacturer.json()
        setName('')
        }
    }

console.log("hi")

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <center><h1>Create a Manufacturer</h1></center>
                        <form onSubmit={ handleSubmit } id="add-manufacturer">
                            <div className="form-floating mb-3">
                                <input
                                onChange={ handleNameChange }
                                value={name}
                                placeholder="Manufacturer Name"
                                required type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ManufacturerForm;
