import React, {useEffect, useState } from 'react';

function AutomobileForm() {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [models, setModels] = useState([]);
    const [model, setModel] = useState(0); // value should be it's id which is an integer

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleChangeYear = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleChangeModel = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;
        // console.log(data);
        const autosUrl = `http://localhost:8100/api/automobiles/`;
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const newAutoResponse = await fetch(autosUrl, fetchOptions);
        // console.log(newAutoResponse.ok)
        // console.log(newAutoResponse.status)
        if (newAutoResponse.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel(0);
            // console.log('FORM SUBMITTED:' + newAutoResponse)
        }
    }

    return (
        <div className="container row offset-3 col-6 shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChangeColor} value={color} placeholder="Color" required type="text" id="color" name="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeYear} value={year} placeholder="Year" required type="text" id="year" name="year" className="form-control"/>
                    <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeVin} value={vin} placeholder="VIN" required type="text" id="vin" name="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Model</label>
                    <select required onChange={handleChangeModel} value={model} id="model_id" name="model_id" className="form-select">
                        <option>Choose a model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>{model.name}</option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default AutomobileForm;
