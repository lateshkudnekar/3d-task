import React, { useEffect, useState } from 'react'
import './Customers.css'
import ReactPaginate from 'react-paginate';
import 'reactjs-popup/dist/index.css';
import EditCustomerModal from '../../../Components/EditCustomerModal';
import { useAlert } from 'react-alert'

export default function Customers() {
    let alert = useAlert()
    const perPage = 5;
    const [customers, setCustomers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [offSet, setOffSet] = useState(0)
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({})
    const closeModal = () => setOpen(false);

    const deleteCustomer = (customer) => {
        if(!window.confirm(`Are you sure you want to delete ${customer.firstName}'s account?`)) {
            return
        }
        let cusObj =  window.localStorage.getItem('customers') || []
        cusObj = JSON.parse(cusObj).filter(c => c.id!=customer.id)
        window.localStorage.setItem('customers', JSON.stringify(cusObj))
        setRefresh(!refresh)
        alert.show("Customer Deleted!")
    }

    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * perPage);
        setOffSet(offset)
    };

    const editCustomer = (c) => {
        setCustomer(c)
        setOpen(o => !o)
    }

    useEffect(() => {
        let customers = JSON.parse(window.localStorage.getItem('customers')) || []
        setPageCount(Math.ceil( customers.length/ perPage))
        customers = customers.slice(offSet,offSet+perPage)
        setCustomers(customers)
    }, [offSet,refresh])
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Post Code</th>
                        <th scope="col">Account Nos.</th>
                        <th scope="col">Delete Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((c) => {
                            return <tr >
                                <td className="cusData" onClick={() => editCustomer(c)}>{c.firstName}</td>
                                <td className="cusData" onClick={() => editCustomer(c)}>{c.lastName}</td>
                                <td className="cusData" onClick={() => editCustomer(c)}>{c.postCode}</td>
                                <td className="cusData" onClick={() => editCustomer(c)}>{c.accounts.map(a => a.accountId.substr(0,4)).join(" ")}</td>
                                <td >{<button className="btn btn-warning" onClick={(e) => deleteCustomer(c)}>Delete</button>}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
            <EditCustomerModal open={open} closeModal={closeModal} customer={customer} refresh={setRefresh}/>
        </div>
    )
}
