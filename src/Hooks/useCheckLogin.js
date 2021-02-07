import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/authContext'

export default function useCheckLogin() {
    let history = useHistory()
    const { authState={}, authActions } = React.useContext(AuthContext);
    useEffect(() => {
        console.log('------');
       if(!authState.user) {
            history.replace('/customer')
       }
    })
    return
}
