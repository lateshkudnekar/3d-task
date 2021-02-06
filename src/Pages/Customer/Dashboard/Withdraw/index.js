import React from 'react'
import useCheckLogin from '../../../../Hooks/useCheckLogin'

export default function Withdraw() {
    useCheckLogin()

    return (
        <div>
            Withdraw
        </div>
    )
}
