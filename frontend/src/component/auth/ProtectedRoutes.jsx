import React, { useState } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({children}) {
    //will integrate these values later
    // const {isAuthenticated,loading}=useAuth();
    const isAuthenticated=true;
    const [loading,setLoding]=useState(false);
    
   if(loading){
  return <div>Loading...</div>
  
}
if(!isAuthenticated){
    return <Navigate to="/login" replace/>
}

return (
    <DashboardLayout>
        {
            children ? children : <Outlet/> 
        }
    </DashboardLayout>
)

}

export default ProtectedRoute
