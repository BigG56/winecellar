import React, { useEffect} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";


const ProtectedRoute = ({ isSignedIn, children }) => {

  if (!isSignedIn) {
    return <Navigate to="/auth/login" />
  }
  return children
}

export default ProtectedRoute;