import api from './api';

// Check if admin is authenticated
export const checkAdminAuth = async (): Promise<boolean> => {
  try {
    // For real implementation, validate token with backend
    // const response = await api.get('/admin/validate-token');
    // return response.status === 200;
    
    // Mock implementation
    const token = localStorage.getItem('adminToken');
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Admin login
export const adminLogin = async (username: string, password: string): Promise<boolean> => {
  try {
    // Actual API call (uncomment when backend is ready)
    const response = await api.post('/admin/login', { username, password });
    localStorage.setItem('adminToken', response.data.token);
    return true;
    
    // Mock implementation - hardcoded for demo purposes
    // In a real app, this should be handled securely by the server
    // const mockAdminUsername = 'admin';
    // const mockAdminPassword = 'admin123';
    
    // if (username === mockAdminUsername && password === mockAdminPassword) {
    //   localStorage.setItem('adminToken', 'mock-jwt-token');
    //   return true;
    // }
    
    // return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Admin logout
export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
};