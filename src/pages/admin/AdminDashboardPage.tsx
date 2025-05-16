import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  FolderKanban, 
  Code2, 
  MessageSquare, 
  Users 
} from 'lucide-react';
import { getAdminStats } from '../../services/adminService';
import { Link } from 'react-router-dom';

interface AdminStats {
  projectCount: number;
  skillCount: number;
  messageCount: number;
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats>({
    projectCount: 0,
    skillCount: 0,
    messageCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="bg-background-light border-0 shadow-custom">
            <Statistic
              title="Total Projects"
              value={stats.projectCount}
              prefix={<FolderKanban className="mr-2 text-primary-500" size={20} />}
              valueStyle={{ color: '#ffffff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="bg-background-light border-0 shadow-custom">
            <Statistic
              title="Total Skills"
              value={stats.skillCount}
              prefix={<Code2 className="mr-2 text-secondary-500" size={20} />}
              valueStyle={{ color: '#ffffff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="bg-background-light border-0 shadow-custom">
            <Statistic
              title="Messages Received"
              value={stats.messageCount}
              prefix={<MessageSquare className="mr-2 text-accent-500" size={20} />}
              valueStyle={{ color: '#ffffff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="bg-background-light border-0 shadow-custom">
            <Statistic
              title="Visitors This Month"
              value={1254}
              prefix={<Users className="mr-2 text-green-500" size={20} />}
              valueStyle={{ color: '#ffffff' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card 
            title="Recent Activity" 
            className="bg-background-light border-0 shadow-custom" 
            loading={loading}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded bg-background-card">
                <div className="flex items-center">
                  <FolderKanban className="text-primary-500 mr-3" size={18} />
                  <span>New project "E-commerce Dashboard" added</span>
                </div>
                <span className="text-xs text-text-secondary">2 days ago</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded bg-background-card">
                <div className="flex items-center">
                  <MessageSquare className="text-accent-500 mr-3" size={18} />
                  <span>New message from Client X</span>
                </div>
                <span className="text-xs text-text-secondary">3 days ago</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded bg-background-card">
                <div className="flex items-center">
                  <Code2 className="text-secondary-500 mr-3" size={18} />
                  <span>Updated TypeScript skill proficiency</span>
                </div>
                <span className="text-xs text-text-secondary">5 days ago</span>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title="Quick Actions" 
            className="bg-background-light border-0 shadow-custom"
          >
            <div className="space-y-3">
              <Link
                to="/admin/projects"
                className="block p-3 bg-background-card rounded hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center">
                  <FolderKanban className="text-primary-500 mr-3" size={18} />
                  <span>Manage Projects</span>
                </div>
              </Link>
              
              <Link
                to="/admin/skills"
                className="block p-3 bg-background-card rounded hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center">
                  <Code2 className="text-secondary-500 mr-3" size={18} />
                  <span>Manage Skills</span>
                </div>
              </Link>
              
              <Link 
                to="/admin/messages"
                className="block p-3 bg-background-card rounded hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center">
                  <MessageSquare className="text-accent-500 mr-3" size={18} />
                  <span>View Messages</span>
                </div>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage;