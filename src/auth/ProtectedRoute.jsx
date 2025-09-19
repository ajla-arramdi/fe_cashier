import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './authService';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Check if user has required role
    if (requiredRole) {
      const user = AuthService.getCurrentUser();
      if (!user || user.role !== requiredRole) {
        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'kasir') {
          navigate('/cashier');
        } else {
          navigate('/login');
        }
        return;
      }
    }
  }, [navigate, requiredRole]);

  // If user is authenticated and has required role, render children
  // In a real app, you might want to show a loading spinner while checking
  return AuthService.isAuthenticated() ? children : null;
};

export default ProtectedRoute;