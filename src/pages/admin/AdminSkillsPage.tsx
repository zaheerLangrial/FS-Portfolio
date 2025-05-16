import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Slider, 
  message, 
  Popconfirm,
  Space,
  Tag
} from 'antd';
import { 
  PlusCircle, 
  Pencil, 
  Trash2 
} from 'lucide-react';
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} from '../../services/skillService';
import { Skill } from '../../types/Skill';

const { Option } = Select;

const AdminSkillsPage = () => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Category options (in a real app, this could come from an API)
  const categoryOptions = [
    'Frontend', 'Backend', 'Database', 'Language',
    'DevOps', 'Design', 'Framework', 'Tool'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      message.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const showCreateModal = () => {
    form.resetFields();
    setEditingSkill(null);
    setModalVisible(true);
  };

  const showEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    form.setFieldsValue(skill);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingSkill) {
        await updateSkill(editingSkill._id, values);
        message.success('Skill updated successfully');
      } else {
        await createSkill(values);
        message.success('Skill created successfully');
      }
      
      setModalVisible(false);
      fetchSkills();
    } catch (error) {
      message.error(editingSkill ? 'Failed to update skill' : 'Failed to create skill');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id);
      message.success('Skill deleted successfully');
      fetchSkills();
    } catch (error) {
      message.error('Failed to delete skill');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Skill, b: Skill) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: categoryOptions.map(cat => ({ text: cat, value: cat })),
      onFilter: (value: string, record: Skill) => record.category === value,
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Proficiency',
      dataIndex: 'proficiency',
      key: 'proficiency',
      sorter: (a: Skill, b: Skill) => a.proficiency - b.proficiency,
      render: (proficiency: number) => (
        <div className="w-40">
          <div className="w-full bg-background-dark rounded-full h-2.5">
            <div 
              className="bg-accent-500 h-2.5 rounded-full" 
              style={{ width: `${proficiency}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1">{proficiency}%</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Skill) => (
        <Space>
          <Button 
            type="text" 
            icon={<Pencil size={18} />} 
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Delete Skill"
            description="Are you sure you want to delete this skill?"
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
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <Button 
          type="primary"
          icon={<PlusCircle size={18} />}
          onClick={showCreateModal}
        >
          Add Skill
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={skills} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ proficiency: 75 }}
        >
          <Form.Item
            name="name"
            label="Skill Name"
            rules={[{ required: true, message: 'Please enter skill name' }]}
          >
            <Input placeholder="Enter skill name" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              {categoryOptions.map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="proficiency"
            label="Proficiency (%)"
            rules={[{ required: true, message: 'Please set proficiency level' }]}
          >
            <Slider 
              marks={{
                0: '0%',
                25: '25%',
                50: '50%',
                75: '75%',
                100: '100%'
              }}
            />
          </Form.Item>
          
          <Form.Item
            name="icon"
            label="Icon URL (Optional)"
          >
            <Input placeholder="https://example.com/icon.svg" />
          </Form.Item>
          
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSkill ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSkillsPage;