import React, { useEffect, useState } from 'react'

function SalespersonHistory() {
    const[salesperson, setSalesperson] = useState('')
    const[salespeople, setSalespeople] = useState([])
    const[sales, setSales] = useState([])

    async function fetchSalespeople() {
        const url = "http://localhost:8090/api/salespeople/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        } else {
            console.error(response)
        }
    }

    async function fetchSales() {
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        fetchSalespeople()
        fetchSales()
    }, [])

    const handleSalespersonChange = (event) => {
        const value = event.target.value
        setSalesperson(value)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <center><h1>Salesperson History</h1></center>
                    <div className="mb-3">
                        <select value={ salesperson } onChange={ handleSalespersonChange } placeholder="Salesperson" name="salesperson" id="salesperson" className="form-select">
                        <option value="">Choose a salesperson</option>
                        { salespeople?.map(salesperson => {
                            return (
                            <option key={salesperson.id} value={salesperson.employee_id}>
                                {`${salesperson.first_name} ${salesperson.last_name}`}
                            </option>
                            )
                        })}
                        </select>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            { sales.filter(sale => {
                            return sale.salesperson.employee_id.toString() == salesperson }
                            ) .map( sale => {
                            return (
                                <tr key={ sale.id }>
                                    <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                    <td>{ sale.automobile.vin }</td>
                                    <td>{ sale.price }</td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SalespersonHistory
