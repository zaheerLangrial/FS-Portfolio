import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  message, 
  Popconfirm,
  Space,
  Tag
} from 'antd';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Link as LinkIcon,
  Github
} from 'lucide-react';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../../services/projectService';
import { Project } from '../../types/Project';

const { TextArea } = Input;
const { Option } = Select;

const AdminProjectsPage = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  // Technology options (in a real app, this could come from an API)
  const technologyOptions = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 
    'Node.js', 'Express', 'MongoDB', 'Django', 
    'TailwindCSS', 'Redux', 'HTML', 'CSS'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      message.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const showCreateModal = () => {
    form.resetFields();
    setEditingProject(null);
    setSelectedTechnologies([]);
    setModalVisible(true);
  };

  const showEditModal = (project: Project) => {
    setEditingProject(project);
    setSelectedTechnologies(project.technologies);
    form.setFieldsValue({
      ...project,
      technologies: project.technologies
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, { ...values, technologies: selectedTechnologies });
        message.success('Project updated successfully');
      } else {
        await createProject({ ...values, technologies: selectedTechnologies });
        message.success('Project created successfully');
      }
      
      setModalVisible(false);
      fetchProjects();
    } catch (error) {
      message.error(editingProject ? 'Failed to update project' : 'Failed to create project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      message.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      message.error('Failed to delete project');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: Project, b: Project) => a.title.localeCompare(b.title),
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (technologies: string[]) => (
        <>
          {technologies.map(tech => (
            <Tag key={tech} color="blue" className="mb-1 mr-1">
              {tech}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => (
        <Tag color={featured ? 'green' : 'default'}>
          {featured ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Links',
      key: 'links',
      render: (text: string, record: Project) => (
        <Space>
          {record.githubUrl && (
            <a 
              href={record.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white"
            >
              <Github size={18} />
            </a>
          )}
          {record.liveUrl && (
            <a 
              href={record.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white"
            >
              <LinkIcon size={18} />
            </a>
          )}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Project) => (
        <Space>
          <Button 
            type="text" 
            icon={<Pencil size={18} />} 
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Delete Project"
            description="Are you sure you want to delete this project?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<Trash2 size={18} />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Button 
          type="primary"
          icon={<PlusCircle size={18} />}
          onClick={showCreateModal}
        >
          Add Project
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={projects} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: 'Please enter project title' }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter project description' }]}
          >
            <TextArea 
              placeholder="Enter project description" 
              rows={4} 
            />
          </Form.Item>
          
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
          
          <Form.Item
            name="technologies"
            label="Technologies Used"
          >
            <Select
              mode="multiple"
              placeholder="Select technologies"
              value={selectedTechnologies}
              onChange={setSelectedTechnologies}
              style={{ width: '100%' }}
            >
              {technologyOptions.map(tech => (
                <Option key={tech} value={tech}>
                  {tech}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="githubUrl"
            label="GitHub URL"
          >
            <Input placeholder="https://github.com/username/repo" />
          </Form.Item>
          
          <Form.Item
            name="liveUrl"
            label="Live Demo URL"
          >
            <Input placeholder="https://example.com" />
          </Form.Item>
          
          <Form.Item
            name="featured"
            label="Featured Project"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProjectsPage;