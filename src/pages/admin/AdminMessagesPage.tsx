import { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Popconfirm, 
  message, 
  Badge, 
  Space,
  Tag,
  Tooltip
} from 'antd';
import { 
  Eye, 
  Trash2, 
  Mail, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import { 
  getMessages, 
  deleteMessage, 
  markMessageAsRead 
} from '../../services/messageService';
import { Message } from '../../types/Message';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageDetails, setMessageDetails] = useState<Message | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      message.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const showMessageDetails = async (msg: Message) => {
    setMessageDetails(msg);
    setDetailsVisible(true);
    
    if (!msg.read) {
      try {
        await markMessageAsRead(msg._id);
        
        // Update the local messages array
        setMessages(prevMessages => 
          prevMessages.map(m => 
            m._id === msg._id ? { ...m, read: true } : m
          )
        );
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      message.success('Message deleted successfully');
      fetchMessages();
      
      if (messageDetails && messageDetails._id === id) {
        setDetailsVisible(false);
      }
    } catch (error) {
      message.error('Failed to delete message');
    }
  };

  const columns = [
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (text: string, record: Message) => (
        record.read ? (
          <Tooltip title="Read">
            <CheckCircle size={18} className="text-green-500" />
          </Tooltip>
        ) : (
          <Tooltip title="Unread">
            <Badge status="processing" color="blue" />
          </Tooltip>
        )
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Message, b: Message) => a.name.localeCompare(b.name),
      render: (text: string, record: Message) => (
        <span className={record.read ? 'text-text-secondary' : 'font-medium'}>
          {text}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <a 
          href={`mailto:${email}`}
          className="flex items-center text-text-secondary hover:text-accent-500"
        >
          <Mail size={14} className="mr-1" /> {email}
        </a>
      ),
    },
    {
      title: 'Message Preview',
      dataIndex: 'message',
      key: 'message',
      render: (text: string, record: Message) => (
        <span className={`truncate block max-w-xs ${record.read ? 'text-text-secondary' : 'text-white'}`}>
          {text.substring(0, 60)}
          {text.length > 60 ? '...' : ''}
        </span>
      ),
    },
    {
      title: 'Received',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Message, b: Message) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <div className="flex items-center text-text-secondary">
            <Clock size={14} className="mr-1" /> {dayjs(date).fromNow()}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Message) => (
        <Space>
          <Button 
            type="text" 
            icon={<Eye size={18} />} 
            onClick={() => showMessageDetails(record)}
          />
          <Popconfirm
            title="Delete Message"
            description="Are you sure you want to delete this message?"
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
        <h1 className="text-2xl font-bold">Messages</h1>
        <div>
          <Tag color="blue">
            {messages.filter(m => !m.read).length} Unread
          </Tag>
          <Tag color="default">
            {messages.length} Total
          </Tag>
        </div>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={messages} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowClassName={record => !record.read ? 'bg-background-card bg-opacity-40' : ''}
      />
      
      <Modal
        title="Message Details"
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={[
          <Button 
            key="reply" 
            type="primary" 
            onClick={() => window.open(`mailto:${messageDetails?.email}`)}
          >
            Reply
          </Button>,
          <Popconfirm
            key="delete"
            title="Delete Message"
            description="Are you sure you want to delete this message?"
            onConfirm={() => {
              if (messageDetails) {
                handleDelete(messageDetails._id);
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>,
          <Button key="close" onClick={() => setDetailsVisible(false)}>
            Close
          </Button>
        ]}
      >
        {messageDetails && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-text-secondary">From:</p>
                <p className="font-medium">{messageDetails.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">Received:</p>
                <p>{new Date(messageDetails.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary">Email:</p>
              <p>
                <a 
                  href={`mailto:${messageDetails.email}`}
                  className="text-accent-500 hover:underline"
                >
                  {messageDetails.email}
                </a>
              </p>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary">Message:</p>
              <div className="mt-2 p-4 bg-background-light rounded whitespace-pre-wrap">
                {messageDetails.message}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminMessagesPage;