import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Input, Button, message } from 'antd';
import { Code2, LogIn } from 'lucide-react';
import { adminLogin } from '../../services/authService';

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      const success = await adminLogin(values.username, values.password);
      
      if (success) {
        message.success('Login successful');
        navigate('/admin');
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background-dark">
      <motion.div
        className="bg-background-card p-8 rounded-xl shadow-custom w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code2 className="text-accent-500" size={48} />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-text-secondary mt-2">
            Enter your credentials to access the admin dashboard
          </p>
        </div>
        
        <Form
          name="admin-login"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input 
              size="large" 
              placeholder="Enter your username"
              className="bg-background-light border-gray-700"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password 
              size="large" 
              placeholder="Enter your password"
              className="bg-background-light border-gray-700"
            />
          </Form.Item>
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LogIn size={18} />}
              size="large"
              className="w-full mt-4"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        
        <div className="text-center mt-6">
          <Link to="/" className="text-text-secondary hover:text-accent-500 text-sm">
            Return to Public Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;