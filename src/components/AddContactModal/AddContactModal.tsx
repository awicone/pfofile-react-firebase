import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Contact } from '@/types/Contact'

interface AddContactModalProps {
  onOk: (contact: Contact) => void,
  onCancel: () => void,
  isVisible: boolean,
  contactsData: Contact[]
  className?: string
}

const AddContactModal = ({ onOk, onCancel, className, isVisible, contactsData }: AddContactModalProps) => {
  const [contactData, setContactData] = useState<Contact>({
    id: contactsData.length,
    name: '',
    address: '',
    phone: null,
    key: contactsData.length
  });

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  useEffect(() => {
    setContactData({
      ...contactData,
      id: contactsData.length,
      key: contactsData.length,
    })
  }, [contactsData])

  return (
    <Modal className={className}
      title="Add a new contact"
      visible={isVisible}
      onOk={() => onOk(contactData)}
      footer={[
        <Button key="submit" type="primary" onClick={() => onOk(contactData)}>
          Add contact
        </Button>,
      ]}
      onCancel={onCancel}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name!' }]}
        >
          <Input name="name" onChange={(e) => handleInputChange(e)} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: false, message: 'Please enter a address!' }]}
        >
          <Input name="address" onChange={(e) => handleInputChange(e)} />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          rules={[{ required: false, message: 'Please enter a address!' }]}
        >
          <Input name="phone"
            onChange={(e) => handleInputChange(e)}
            type={'number'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContactModal;
