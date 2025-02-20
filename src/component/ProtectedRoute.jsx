import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  if (!user || (!user.isAdmin && requireAdmin)) {
    return <Navigate to='/' replace></Navigate>;
  }
  return children;
}
