import api from './api';
import { Message } from '../types/Message';

// Mock data for initial development
const MOCK_MESSAGES: Message[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Hello, I\'m interested in discussing a potential project. Could you please provide more information about your services and availability?',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    message: 'I came across your portfolio and was impressed by your work on the Hospital Services project. I\'m looking for someone with similar experience for a healthcare application. Would you be available for a discussion?',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    message: 'Hi there,\n\nI\'m the CTO of a startup working on a web application that requires both frontend and backend expertise. Your skills seem like a good match for our project.\n\nCould we schedule a call to discuss the details?\n\nBest regards,\nAlex',
    read: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Get all messages
export const getMessages = async (): Promise<Message[]> => {
  try {
    // Actual API call (uncomment when backend is ready)
    const response = await api.get('/messages');
    return response.data;
    
    // Mock data
    // return [...MOCK_MESSAGES].sort((a, b) => 
    //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    // );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Get a single message by ID
export const getMessageById = async (id: string): Promise<Message | null> => {
  try {
    // Actual API call (uncomment when backend is ready)
    const response = await api.get(`/messages/${id}`);
    return response.data;
    
    // Mock data
    // const message = MOCK_MESSAGES.find(m => m._id === id);
    // return message || null;
  } catch (error) {
    console.error(`Error fetching message ${id}:`, error);
    return null;
  }
};

// Create a new message
export const createMessage = async (messageData: { name: string; email: string; message: string }): Promise<Message> => {
  try {
    // Actual API call (uncomment when backend is ready)
    const response = await api.post('/messages', messageData);
    return response.data;
    
    // // Mock data
    // const newMessage: Message = {
    //   _id: Date.now().toString(),
    //   ...messageData,
    //   read: false,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString()
    // };
    // MOCK_MESSAGES.unshift(newMessage);
    // return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

// Mark a message as read
export const markMessageAsRead = async (id: string): Promise<Message> => {
  try {
    // Actual API call (uncomment when backend is ready)
    const response = await api.patch(`/messages/${id}/read`);
    return response.data;
    
    // Mock data
    // const index = MOCK_MESSAGES.findIndex(m => m._id === id);
    // if (index === -1) throw new Error('Message not found');
    
    // MOCK_MESSAGES[index].read = true;
    // MOCK_MESSAGES[index].updatedAt = new Date().toISOString();
    // return MOCK_MESSAGES[index];
  } catch (error) {
    console.error(`Error marking message ${id} as read:`, error);
    throw error;
  }
};

// Delete a message
export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    // Actual API call (uncomment when backend is ready)
    await api.delete(`/messages/${id}`);
    
    // Mock data
    // const index = MOCK_MESSAGES.findIndex(m => m._id === id);
    // if (index === -1) throw new Error('Message not found');
    
    // MOCK_MESSAGES.splice(index, 1);
    return true;
  } catch (error) {
    console.error(`Error deleting message ${id}:`, error);
    throw error;
  }
};