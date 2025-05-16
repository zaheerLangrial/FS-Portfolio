import { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Button, notification } from 'antd';
import { Send } from 'lucide-react';
import { createMessage } from '../services/messageService';

const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await createMessage(values);
      
      notification.success({
        message: 'Message Sent',
        description: 'Thank you for your message! I will get back to you soon.',
      });
      
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to send message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-background-card rounded-xl shadow-custom p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-w-2xl mx-auto"
      >
        <Form.Item
          name="name"
          label="Your Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input 
            size="large" 
            placeholder="John Doe"
            className="bg-background-light border-gray-700 rounded-lg"
          />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input 
            size="large" 
            placeholder="john.doe@example.com" 
            className="bg-background-light border-gray-700 rounded-lg"
          />
        </Form.Item>
        
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <TextArea 
            rows={5} 
            placeholder="How can I help you?"
            className="bg-background-light border-gray-700 rounded-lg"
          />
        </Form.Item>
        
        <Form.Item>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              icon={<Send size={18} />}
              className="w-full md:w-auto flex items-center justify-center"
            >
              Send Message
            </Button>
          </motion.div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default ContactForm;