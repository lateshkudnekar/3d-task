import React, { useEffect,useState } from 'react'
import { AuthContext } from '../../../../Context/authContext';
import useCheckLogin from '../../../../Hooks/useCheckLogin';

export default function Transactions() {
   
    useCheckLogin()

    return (
        <div>
        </div>
    )
}
