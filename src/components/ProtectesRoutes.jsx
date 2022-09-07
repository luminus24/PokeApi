import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import {Outlet, Navigate } from 'react-router-dom'

const ProtectesRoutes = () => {
    const nameTrainer = useSelector(state => state.nameTrainer)
    if(nameTrainer){
        return <Outlet/>
    }else{
        return <Navigate to ='/'/>
    }
}

export default ProtectesRoutes