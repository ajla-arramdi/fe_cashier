// src/auth/authService.js
const API_BASE_URL = 'http://localhost:8000/api';

class AuthService {
  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register user
  static async register(name, email, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout user
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  static getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!AuthService.getToken();
  }

  // Check if user is admin
  static isAdmin() {
    const user = AuthService.getCurrentUser();
    return user && user.role === 'admin';
  }

  // Check if user is cashier
  static isCashier() {
    const user = AuthService.getCurrentUser();
    return user && user.role === 'kasir';
  }
}

export default AuthService;