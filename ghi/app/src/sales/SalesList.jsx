import React, { useEffect, useState } from 'react'

function SalesList() {
    const [salesData, setSalesData] = useState([])

    async function loadSalesData() {
        const response = await fetch("http://localhost:8090/api/sales/")
        if (response.ok) {
            const data = await response.json()
            setSalesData(data.sales)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        loadSalesData()
    }, [])

    return (
    <>
    <br />
    <h1>Sales</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Name</th>
                    <th>Salesperson Employee ID</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            { salesData?.map(sales => {
                return (
                <tr key={ sales.id }>
                    <td>{ sales.salesperson.first_name } { sales.salesperson.last_name }</td>
                    <td>{ sales.salesperson.employee_id }</td>
                    <td>{ sales.customer.first_name } { sales.customer.last_name }</td>
                    <td>{ sales.automobile.vin }</td>
                    <td>${ sales.price.toFixed(2) }</td> 
                </tr>
                )
            })}
            </tbody>
        </table>
    </>
    )
}

export default SalesList
