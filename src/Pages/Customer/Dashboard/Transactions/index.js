import React, { useEffect,useState } from 'react'
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../../../../Context/authContext';
import useCheckLogin from '../../../../Hooks/useCheckLogin';

export default function Transactions() {
    useCheckLogin()
    const perPage = 5;
    const [pageCount, setPageCount] = useState(0)
    const [offSet, setOffSet] = useState(0)
    const [disTranstn, setdisTranstn] = useState([])
    const { authState = {}, authActions } = React.useContext(AuthContext);
    let {user={}} = authState;
    let {defaultAccount={}} = user || {};
    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * perPage);
        setOffSet(offset)
    };


    let {transactions=[]}= defaultAccount;
    useEffect(() => {
        setPageCount(Math.ceil( transactions.length/ perPage))
        transactions=transactions.sort(function(a,b){
            return new Date(b.datetime) - new Date(a.datetime)
          })
        transactions = transactions.slice(offSet,offSet+perPage)
        setdisTranstn(transactions)
    }, [offSet,authState])
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date Time</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        disTranstn.map((c) => {
                            return <tr >
                                <td className="cusData">{new Date(c.datetime).toLocaleString()}</td>
                                <td className="cusData">{c.amount}</td>
                                <td className="cusData">{c.type}</td>
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
        </div>
    )
}
