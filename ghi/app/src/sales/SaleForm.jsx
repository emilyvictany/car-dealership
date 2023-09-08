import React, { useEffect, useState } from 'react'

function SaleForm() {
    const [price, setPrice] = useState('')
    const [automobile, setAutomobile] = useState('')
    const [salesperson, setSalesperson] = useState('')
    const [customer, setCustomer] = useState('')
    const [automobiles, setAutomobiles] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])

    const [vins, setVins] = useState([])
    const [vin, setVin] = useState('')

    async function fetchAutomobileData() {
        const AutomobileUrl = "http://localhost:8100/api/automobiles/"
        const response = await fetch(AutomobileUrl)
        if (response.ok) {
            const data = await response.json()
            setAutomobiles(data.autos)
        } else {
            console.error(response)
        }
    }
    // console.log(automobiles)

    const loadCustomers = async () => {
        const response = await fetch("http://localhost:8090/api/customers/")
        console.log(response);
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        } else {
            console.error(response)
            }
    }

    async function loadSalespeople() {
    const response = await fetch("http://localhost:8090/api/salespeople/")
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        setSalespeople(data.salespeople)
    } else {
        console.error(response)
        }
    }

    useEffect(() => {
        fetchAutomobileData()
        loadCustomers()
        loadSalespeople()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}

        data.price = price
        data.automobile = vin
        data.salesperson = salesperson
        data.customer = customer
        console.log(data)

        const url = "http://localhost:8090/api/sales/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig)
        console.log(response.ok)
        console.log(response.status)

        const soldUrl = `http://localhost:8100/api/automobiles/${vin}/`
        const fetchSoldConfig = {
            method: "put",
            body: JSON.stringify({"sold": true}),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const soldResponse = await fetch(soldUrl, fetchSoldConfig);
        if (soldResponse.ok) {
            const updateSold = await soldResponse.json()
            setAutomobile(updateSold)
        }

        if (response.ok) {
            const newSale = await response.json()
            console.log(newSale)
            setVin('')
            setSalesperson('')
            setCustomer('')
            setPrice('')
        }
    }


    const handlePriceChange = (event) => {
    const value = event.target.value
    setPrice(value)
    }

    const handleAutomobileChange = (event) => {
    const value = event.target.value
    setAutomobile(value)
    }

    const handleSalespersonChange = (event) => {
    const value = event.target.value
    setSalesperson(value)
    }

    const handleCustomerChange = (event) => {
    const value = event.target.value
    setCustomer(value)
    }

    const handleVinChange = (event) => {
    const value = event.target.value
    setVin(value);
    }

    async function getVin() {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let unsoldAutos = [];
            for (let auto of data.autos) {
                if (auto.sold === false) {
                    unsoldAutos.push(auto);
                }
            }
            setVins(unsoldAutos);
        }
    }

    useEffect(() => {
        getVin();
        // getSalespeople();
        // getCustomers();
    }, []);



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <center><h1>Record a New Sale</h1></center>
                    <form onSubmit={ handleSubmit } id="create-sale-form">
                        <div className="form-floating mb-3">
                            <select onChange={ handleVinChange } value={vin} placeholder="Automobile VIN" type="text" name="automobile" id="automobile" className="form-select">
                                <option value="">Choose an Automobile VIN</option>
                                {vins?.map(auto => {
                                    return (
                                    <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={ handleSalespersonChange } value={salesperson} placeholder="salesperson" type="text" name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespeople?.map(salespeople => {
                                    return (
                                        <option key={salespeople.id} value={salespeople.employee_id}>{salespeople.first_name} {salespeople.last_name}</option>
                                        )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleCustomerChange} value={customer} placeholder="Customer" type="text" name="customer" id="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers?.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} required placeholder="Price" type="text" min="0" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <center><button className="btn btn-primary">Create</button></center>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SaleForm
