import React, { useEffect, useState } from 'react'

function SaleForm() {
    const [price, setPrice] = useState('')
    const [automobile, setAutomobile] = useState('')
    const [salesperson, setSalesperson] = useState('')
    const [customer, setCustomer] = useState('')
    const [automobiles, setAutomobiles] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])

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
        data.automobile = automobile
        data.salesperson = salesperson
        data.customer = customer
        console.log(data)
        const salesUrl = "http://localhost:8090/api/sales/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        }

    try {
        const sale = await fetch(salesUrl, fetchConfig);
        if (sale.ok) {
        const newSale = await sale.json()
        console.log(newSale)
        setPrice('')
        setAutomobile('')
        setSalesperson('')
        setCustomer('')
        } else {
        console.error(sale)
        }
    } catch (error) {
        console.error(error)
    }
    }

    const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value)
    }

    const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value)
    }

    const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value)
    }

    const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <center><h1>Record a New Sale</h1></center>
                    <form onSubmit={ handleSubmit } id="create-sale-form">
                        <div className="form-floating mb-3">
                            <select required value={automobile} onChange={ handleAutomobileChange } placeholder="Automobile VIN" type="text" name="automobile" id="automobile" className="form-select">
                                <option value="">Choose an Automobile VIN</option>
                                {automobiles?.map(auto => {return (
                                <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                                )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleSalespersonChange} placeholder="salesperson" type="text" name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespeople?.map(salespeople => {
                                    return (
                                        <option key={salespeople.id} value={salespeople.employee_id}>{salespeople.first_name} {salespeople.last_name}</option>
                                        )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleCustomerChange} placeholder="Customer" type="text" name="customer" id="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers?.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} required placeholder="Price" type="text" min="0" name="price" id="price" className="form-control" />
                            <label htmlFor="address">Price</label>
                        </div>
                        <center><button className="btn btn-primary">Create</button></center>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SaleForm
