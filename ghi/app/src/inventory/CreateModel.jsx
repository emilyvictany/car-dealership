import React, {useEffect, useState } from 'react';

function ModelForm() {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState(0); //value should be it's id which is an integer

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangePictureUrl = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;
        // console.log(data);

        const modelsUrl = `http://localhost:8100/api/models/`;
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const modelsResponse = await fetch(modelsUrl, fetchOptions);
        // console.log(modelsResponse.ok)
        // console.log(modelsResponse.status)
        if (modelsResponse.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer(0);
            // console.log('FORM SUBMITTED:' + modelsResponse)
        }
    }

    return (
        <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChangeName} value={name} placeholder="Model Name" required type="text" id="name" name="name" className="form-control"/>
                    <label htmlFor="name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangePictureUrl} value={pictureUrl} placeholder="Picture URL" required type="text" id="picture_url" name="picture_url" className="form-control"/>
                    <label htmlFor="picture_url">Picture URL</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                    <select required onChange={handleChangeManufacturer} value={manufacturer} id="manufacturer_id" name="manufacturer_id" className="form-select">
                        <option>Choose a manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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

export default ModelForm;
