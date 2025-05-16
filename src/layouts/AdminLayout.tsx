import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Code2, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { checkAdminAuth } from '../services/authService';

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await checkAdminAuth();
        setIsAuthenticated(isAuth);
        if (!isAuth) {
          navigate('/admin/login');
        }
      } catch (error) {
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="p-0 flex items-center bg-background-dark border-b border-gray-800">
        <div className="px-6 text-lg font-semibold text-white flex items-center">
          <Code2 className="mr-2 text-accent-500" />
          <span>Portfolio Admin</span>
        </div>
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{ background: '#1e1e1e' }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0, background: '#1e1e1e' }}
            items={[
              {
                key: 'dashboard',
                icon: <LayoutDashboard size={18} />,
                label: 'Dashboard',
                onClick: () => navigate('/admin')
              },
              {
                key: 'projects',
                icon: <FolderKanban size={18} />,
                label: 'Projects',
                onClick: () => navigate('/admin/projects')
              },
              {
                key: 'skills',
                icon: <Code2 size={18} />,
                label: 'Skills',
                onClick: () => navigate('/admin/skills')
              },
              {
                key: 'messages',
                icon: <MessageSquare size={18} />,
                label: 'Messages',
                onClick: () => navigate('/admin/messages')
              },
              {
                key: 'logout',
                icon: <LogOut size={18} />,
                label: 'Logout',
                onClick: handleLogout
              }
            ]}
          />
        </Sider>
        <Layout className="bg-background-dark">
          <Content className="m-4 p-4 bg-background-card rounded-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;